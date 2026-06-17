import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OddsService {
  private readonly apiUrl = 'http://localhost:3000/odds';

  constructor(private readonly http: HttpClient) {}

  getFormattedEvents(sport: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/formatted-events?sport=${sport}`,
    );
  }
}