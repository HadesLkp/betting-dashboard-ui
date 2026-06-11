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
    result?: string;
  }): Observable<any[]> {
    const params: any = {};

    if (filters?.sport) {
      params.sport = filters.sport;
    }

    if (filters?.result) {
      params.result = filters.result;
    }

    return this.http.get<any[]>(this.apiUrl, {
      params,
    });
  }

  createBet(bet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, bet);
  }

  updateResult(id: number, result: 'win' | 'loss' | 'push'): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, {
      result,
    });
  }
}