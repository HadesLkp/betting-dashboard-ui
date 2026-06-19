import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BetsService {
  private readonly apiUrl = 'http://localhost:3000/bets';

  constructor(private readonly http: HttpClient) { }

  getBets(filters?: {
    sport?: string;
    market?: string;
    result?: string;
    from?: string;
    to?: string;
  }): Observable<any[]> {
    const params: any = {};

    if (filters?.sport) params.sport = filters.sport;
    if (filters?.market) params.market = filters.market;
    if (filters?.result) params.result = filters.result;
    if (filters?.from) params.from = filters.from;
    if (filters?.to) params.to = filters.to;

    return this.http.get<any[]>(this.apiUrl, { params });
  }

  createBet(bet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bet);
  }

  deleteBet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateBet(id: number, bet: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, bet);
  }

  updateResult(id: number, result: 'win' | 'loss' | 'push'): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, {
      result,
    });
  }

  autoSettle() {
    return this.http.post(`${this.apiUrl}/auto-settle`, {});
  }
}