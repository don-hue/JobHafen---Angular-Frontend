import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Injectable } from '@angular/core';
import {TEST_DATA} from '../../data/testData';

interface JobTableRow {
    id: number;
    jobTitle: string;
    applied: boolean;
    companyName: string;
    portal: string;
}


@Injectable({
  providedIn: 'root'
})



@Component({
  selector: 'app-table-view',
  imports: [RatingModule, TableModule, TagModule, FormsModule],
  templateUrl: './table-view.html',
  styleUrl: './table-view.css',
})
export class TableView {
   jobs: JobTableRow[] = [];

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


}
