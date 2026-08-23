import {ChangeDetectorRef, Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Injectable } from '@angular/core';
import {TEST_DATA} from '../../data/testData';
import { Search } from '@primeicons/angular/search';
import { ButtonModule } from 'primeng/button';
import { JobService } from '../../service/job-service';
import { CommonModule } from '@angular/common';
import { Replay } from '@primeicons/angular/replay';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Url } from 'url';
interface JobTableRow {
    id: number;
    jobTitle: string;
    applied: boolean;
    companyName: string;
    companyHomepage: Url;
}


@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-table-view',
  imports: [ProgressSpinnerModule,Replay,RatingModule, TableModule, TagModule, FormsModule, Search, ButtonModule, CommonModule],
  templateUrl: './table-view.html',
  styleUrl: './table-view.css',
})
export class TableView {
   jobs: JobTableRow[] = [];
   private jobService = inject(JobService);
   private cdr = inject(ChangeDetectorRef);
  public isLoading: boolean = false; 

  
  getJob(): void {
    this.isLoading = true;
    this.jobService.getJobs().subscribe({
        next: (res) => {
          console.log("XXX in next start");
          console.log("XXX res:"+ res);
          const newJobs = res
          .filter(job =>
            !this.jobs.some(
              existingJob => existingJob.id === job.id
            )
           )
           .map(job => ({
              id: job.id,
              jobTitle: job.jobTitle,
              applied: job.applied,
              companyName: job.companyName,
              companyHomepage: job.companyHomepage 
           }));
           this.jobs = [
            ...this.jobs,
            ...newJobs
           ]
      },
      error: (err) => {
        console.error("XXX",err);
        this.isLoading = true;
      },
      complete: () => {
        console.log("XXX in complete start");
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }


}
