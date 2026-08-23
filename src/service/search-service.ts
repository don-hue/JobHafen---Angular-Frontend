import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { SearchDto } from '../dto/search-dto';
import { Observable } from 'rxjs';
import { SearchEntityDto } from '../dto/search-entity-dto';

@Service()
export class SearchService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8080/proxy/sendSaveSearchRequest';
    private getUrl = 'http://localhost:8080/proxy/sendGetAllRequest';

     saveSearch(searchDto: SearchDto): Observable<SearchEntityDto[]> {
        return this.http.post<SearchEntityDto[]>(this.apiUrl, searchDto);
    }

     getAllSearches(): Observable<SearchEntityDto[]> {
        return this.http.get<SearchEntityDto[]>(this.getUrl);
      }
}
