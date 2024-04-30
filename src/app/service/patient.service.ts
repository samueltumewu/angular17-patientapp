import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, last } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/patient'

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPageable(pageNumber: number, pageSize: number): Observable<any> {
    return this.http.get<any>(`${baseUrl}?page=${pageNumber}&page_size=${pageSize}`);
  }

  getPageableSearch(pageNumber: number, pageSize: number, firstName: string, lastName: string): Observable<any> {
    if (firstName != '' && lastName == '') {
      return this.http.get<any>(`${baseUrl}?page=${pageNumber}&page_size=${pageSize}&first_name=${firstName}`);
    } else if (firstName == '' && lastName != '') {
      return this.http.get<any>(`${baseUrl}?page=${pageNumber}&page_size=${pageSize}&last_name=${lastName}`);
    } else if (firstName != '' && lastName != '') {
      return this.http.get<any>(`${baseUrl}?page=${pageNumber}&page_size=${pageSize}&first_name=${firstName}&last_name=${lastName}`);
    } else {
      return this.http.get<any>(`${baseUrl}?page=${pageNumber}&page_size=${pageSize}&first_name=${firstName}&last_name=${lastName}`);
    }
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(pid: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/pid/${pid}`, data);
  }

  delete(pid: any): Observable<any> {
    return this.http.delete(`${baseUrl}/pid/${pid}`);
  }
}
