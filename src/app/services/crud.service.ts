import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  url = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  createData(Policy: any): Observable<any> {
    return this.http.post(this.url+"policies", Policy);
  }

  getData(): Observable<any> {
    return this.http.get(this.url+"policies");
  }

  deleteData(id: any): Observable<any> {
    return this.http.delete(this.url+"policies/" + id);
  }

  updateData(id: any, policy: any): Observable<any> {
    return this.http.put(this.url+"policies/" + id, policy);
  }

  getPolicyById(id: any): Observable<any> {
    return this.http.get(this.url + "policies/" + id);
  }

}
