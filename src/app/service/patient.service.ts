import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/patient'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPageable(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}?page=${pageNumber}&page_size=${pageSize}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(pid: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/pid/${pid}`, data);
  }

  delete(pid: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${pid}`);
  }
}
