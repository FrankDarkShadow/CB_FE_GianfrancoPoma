import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Account {


private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAccount(id: number): Observable<any> {
    return this.http.get(`${this.url}/accounts/${id}`);
  }

  postTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.url}/transactions`, transaction);
  }


}
