import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BankrollService {
  private readonly apiUrl = 'http://localhost:3000/bankroll';

  constructor(private readonly http: HttpClient) {}

  getCurrent() {
  return this.http.get<any>(`${this.apiUrl}/current`);
}

  getHistory(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/history`,
    );
  }

  createBankroll(initialAmount: number) {
  return this.http.post<any>(this.apiUrl, {
    initialAmount,
  });
}
}