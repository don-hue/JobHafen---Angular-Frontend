import {ChangeDetectorRef, Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Injectable } from '@angular/core';
import {TEST_DATA} from '../../data/testData';
import { Search } from '@primeicons/angular/search';
import { ButtonModule } from 'primeng/button';
import { JobService } from '../../service/JobService';
import { CommonModule } from '@angular/common';
import { Replay } from '@primeicons/angular/replay';
interface JobTableRow {
    id: number;
    jobTitle: string;
    applied: boolean;
    companyName: string;
    portal: string;
}

export interface Message {
  message: string;
}


@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-table-view',
  imports: [Replay,RatingModule, TableModule, TagModule, FormsModule, Search, ButtonModule, CommonModule],
  templateUrl: './table-view.html',
  styleUrl: './table-view.css',
})
export class TableView {
   jobs: JobTableRow[] = [];
   private jobService = inject(JobService);
   response?: Message; 
   private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
        this.jobs = TEST_DATA.jobs.map(job => {

            const company = TEST_DATA.companies.find(
                c => c.id === job.companyId
            );

            return {
                id: job.id,
                jobTitle: job.jobTitle,
                applied: job.applied,
                companyName: company?.companyName ?? 'Unknown',
                portal: TEST_DATA.search.portal
            };
        });
  }

  send(): void {
     const payload: Message = {
      message: 'Hello from Angular!',
    };

     console.log('1. sending');

    this.jobService.postMessage(payload).subscribe({
        next: (res) => {
         console.log('2. response received:', res);

            this.response = res;

            console.log('3. response property:', this.response);
            this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("XXX",err);
      },
    });
  }


}
