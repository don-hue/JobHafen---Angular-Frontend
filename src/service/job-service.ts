import { Injectable, Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JobDto } from '../dto/job-dto';

@Service()
export class JobService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/proxy/getJobsRequest';


  getJobs(): Observable<JobDto[]> {
    return this.http.get<JobDto[]>(this.apiUrl);
  }
}