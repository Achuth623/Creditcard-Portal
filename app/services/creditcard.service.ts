import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Creditcard } from '../models/creditcard';

@Injectable({
  providedIn: 'root',
})
export class CreditcardService {
  private apiUrl = 'http://localhost:3000/creditcards';
  constructor(private _http: HttpClient) {}
  //create
  createCreditCard(post: any): Observable<any> {
    return this._http.post<any>(this.apiUrl, post);
  }
  //get
  getCreditData(): Observable<Creditcard[]> {
    return this._http.get<Creditcard[]>(this.apiUrl);
  }
  //get by id
  getCreditcardId(id: number): Observable<Creditcard> {
    return this._http.get<Creditcard>(`${this.apiUrl}/${id}`);
  }
  //updated
  updateCreditcard(post: Creditcard): Observable<Creditcard> {
    return this._http.put<Creditcard>(`${this.apiUrl}/${post.id}`, post);
  }
  //delete
  deleteCreditCard(id: number): Observable<Creditcard> {
    return this._http.delete<Creditcard>(`${this.apiUrl}/${id}`);
  }
}
