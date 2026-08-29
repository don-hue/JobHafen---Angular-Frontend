import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JobDto } from '../dto/job-dto';
import { updateAppliedRequestBody } from '../dto/request-dto';

@Service()
export class JobService {
  private http = inject(HttpClient);
  private getJobsUrl = 'http://localhost:8080/proxy/getJobsRequest';
  private updateAppliedUrl = 'http://localhost:8080/proxy/updateAppliedRequest';


  getJobs(): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(this.getJobsUrl);
  }
  updateApplied(body: updateAppliedRequestBody):Observable<void> {
    return this.http.post<void>(this.updateAppliedUrl,body);
  }
}