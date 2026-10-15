import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JobDto } from '../dto/job-dto';
import { updateAppliedRequestBody } from '../dto/request-dto';

@Service()
export class JobService {
  private http = inject(HttpClient);
  private getJobsUrl = 'http://localhost:8080/proxy/job/getJobsRequest';
  private updateAppliedUrl = 'http://localhost:8080/proxy/job/updateJobAppliedRequest';


  getJobs(): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(this.getJobsUrl);
  }
  updateApplied(body: updateAppliedRequestBody):Observable<void> {
    return this.http.put<void>(this.updateAppliedUrl,body);
  }
}