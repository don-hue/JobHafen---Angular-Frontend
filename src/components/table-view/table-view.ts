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
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CheckCircle } from '@primeicons/angular/check-circle';
import { updateAppliedRequestBody } from '../../dto/request-dto';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
interface JobTableRow {
    id: number;
    jobTitle: string;
    applied: boolean;
    companyName: string;
    companyHomepage?: Url;
    toogleDisable: boolean;
}


@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-table-view',
  imports: [ToastModule,MessageModule,ToggleSwitchModule,CheckCircle,ProgressSpinnerModule,Replay,RatingModule, TableModule, TagModule, FormsModule, Search, ButtonModule, CommonModule],
  templateUrl: './table-view.html',
  styleUrl: './table-view.css',
  providers: [MessageService]
})
export class TableView implements OnInit {
  jobs: JobTableRow[] = [];
  private jobService = inject(JobService);
  private cdr = inject(ChangeDetectorRef);
  public isLoading: boolean = false; 
  private messageService = inject(MessageService);

  ngOnInit(): void {
    const test: JobTableRow = {
            id: 1,
            jobTitle: "Java Entwickler (m/w/d)",
            applied:true, 
            companyName:"DeineTraumFirma GmbH",
            companyHomepage: undefined, 
            toogleDisable: false,
          };
    const test1: JobTableRow = {
      id: 2,
      jobTitle: "Full Stack Developer (m/w/d)",
      applied:false, 
      companyName:"DeineTraumFirma GmbH",
      companyHomepage: undefined, 
      toogleDisable:false,
    };

    this.jobs.push(test);
    this.jobs.push(test1);
  }

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
              companyHomepage: job.companyHomepage, 
              toogleDisable: false
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


  updateApplied(cell: JobTableRow):void {
    cell.toogleDisable = true; 
    const body: updateAppliedRequestBody = {
      id: cell.id, 
      applied: cell.applied
    }

    this.jobService.updateApplied(body)
    .subscribe({
      next: _ => {
         this.messageService.add({ 
              severity: 'success', 
              summary: 'Erfolgreich', 
              detail: 'Status gespeichert', 
              life: 1500 });
          cell.toogleDisable = false; 
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({ 
              severity: 'error', 
              summary: 'Fehler', 
              detail: 'Status konnte nicht gespeichert werden', 
              life: 1500 });
       cell.applied = !body.applied;
       cell.toogleDisable = false; 
     
      }, 
      complete: () => {
        this.cdr.detectChanges();
      }
    })
  }

}
