import {ChangeDetectorRef, Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Injectable } from '@angular/core';
import {TEST_DATA} from '../../data/testData';
import { ButtonModule } from 'primeng/button';
import { JobService } from '../../service/JobService';
import { CommonModule } from '@angular/common';
import { PlusCircle } from '@primeicons/angular/plus-circle';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SearchDialog } from '../search-dialog/search-dialog';
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
  selector: 'app-search-table',
  imports: [Replay,SearchDialog,RatingModule, TableModule, TagModule, FormsModule, PlusCircle, ButtonModule, CommonModule],
  templateUrl: './search-table.html',
  styleUrl: './search-table.css',
  providers: [DialogService]
})


export class SearchTable {
    searches?: JobTableRow[];
    response?: Message; 
    private jobService = inject(JobService);
    private cdr = inject(ChangeDetectorRef);
    private dialogService = inject(DialogService);
    ref?: DynamicDialogRef | null;


  
    ngOnInit() {
          // this.searches = TEST_DATA.jobs.map(job => {
  
          //     const company = TEST_DATA.companies.find(
          //         c => c.id === job.companyId
          //     );
  
          //     return {
          //         id: job.id,
          //         jobTitle: job.jobTitle,
          //         applied: job.applied,
          //         companyName: company?.companyName ?? 'Unknown',
          //         portal: TEST_DATA.search.portal
          //     };
          // });      
    }
    ngOnDestroy() {
      if(this.ref) {
        this.ref.close();
      }
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
    show(): void {
        this.ref = this.dialogService.open(SearchDialog, {
            header: 'Neue Suche anlegen',
            width: '20vw',
            height: '30vh',
            modal: true,
            closable: true,
            breakpoints: {
                '1250px': '30vw',
                '960px': '75vw',
                '300px': '90vw'
            },
        });
    }
}
