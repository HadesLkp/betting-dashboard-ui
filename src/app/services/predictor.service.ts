import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictorService {
  private readonly apiUrl = 'http://localhost:3000/predictor';

  constructor(private readonly http: HttpClient) { }

  analyzeWithModel(data: {
    homeTeamId: number;
    awayTeamId: number;
    selectionType: 'HOME' | 'DRAW' | 'AWAY';
    odds: number;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/analyze-with-model`,
      data,
    );
  }

  analyzeEvent(data: {
    homeTeam: string;
    awayTeam: string;
    selectionType: 'HOME' | 'DRAW' | 'AWAY';
    odds: number;
  }) {
    return this.http.post<any>(
      `${this.apiUrl}/analyze-event`,
      data,
    );
  }

  
}