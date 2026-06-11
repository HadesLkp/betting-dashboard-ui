import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankrollService {
  private readonly apiUrl = 'http://localhost:3000/bankroll';

  constructor(private readonly http: HttpClient) {}

  getCurrent(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/history`,
    );
  }
}