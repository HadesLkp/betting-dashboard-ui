import { Component, OnInit } from '@angular/core';
import { BetsService } from '../../services/bets.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss'],
})
export class BetsComponent implements OnInit {
  bets: any[] = [];

  form = {
    sport: '',
    eventName: '',
    market: '',
    selection: '',
    odds: null,
    stake: null,
    estimatedProbability: null,
  };

  filters = {
    sport: '',
    result: '',
  };

  constructor(private readonly betsService: BetsService) { }

  ngOnInit(): void {
    this.loadBets();
  }

  loadBets(): void {
    this.betsService.getBets(this.filters).subscribe({
      next: (data: any[]) => {
        this.bets = data;
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  applyFilters(): void {
    this.loadBets();
  }

  clearFilters(): void {
    this.filters = {
      sport: '',
      result: '',
    };

    this.loadBets();
  }

  getSportLabel(sport: string): string {
    const sports: Record<string, string> = {
      FOOTBALL: 'Fútbol',
      BASKETBALL: 'Baloncesto',
      TENNIS: 'Tenis',
      BASEBALL: 'Béisbol',
      ESPORTS: 'eSports',
      MMA: 'MMA',
      BOXING: 'Boxeo',
    };

    return sports[sport] || sport;
  }

  getMarketLabel(market: string): string {
    const markets: Record<string, string> = {
      MATCH_WINNER: 'Ganador del partido',
      OVER_UNDER_GOALS: 'Más/Menos goles',
      BTTS: 'Ambos equipos marcan',
      DOUBLE_CHANCE: 'Doble oportunidad',
      DRAW_NO_BET: 'Empate no acción',
      ASIAN_HANDICAP: 'Hándicap asiático',
      FIRST_HALF_WINNER: 'Ganador primer tiempo',
      CORRECT_SCORE: 'Marcador exacto',
    };

    return markets[market] || market;
  }

  createBet(): void {
    this.betsService.createBet(this.form).subscribe({
      next: () => {
        this.loadBets();

        this.form = {
          sport: '',
          eventName: '',
          market: '',
          selection: '',
          odds: null,
          stake: null,
          estimatedProbability: null,
        };
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  settleBet(id: number, result: 'win' | 'loss' | 'push'): void {
    this.betsService.updateResult(id, result).subscribe({
      next: () => {
        this.loadBets();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}