import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  stats: any;
  sportRoiChart: any;
  selectedChart = 'sportRoi';
  analyticsChart: any;

  constructor(
    private readonly statsService: StatsService,
  ) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        setTimeout(() => {
          this.createAnalyticsChart();
        }, 0);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createAnalyticsChart(): void {
  if (!this.stats) {
    return;
  }

  let labels: string[] = [];
  let values: number[] = [];
  let label = '';

  if (this.selectedChart === 'sportRoi') {
    labels = this.stats.sports.map((item: any) =>
      this.getSportLabel(item.sport),
    );
    values = this.stats.sports.map((item: any) =>
      Number(item.roi),
    );
    label = 'ROI %';
  }

  if (this.selectedChart === 'sportProfit') {
    labels = this.stats.sports.map((item: any) =>
      this.getSportLabel(item.sport),
    );
    values = this.stats.sports.map((item: any) =>
      Number(item.profit),
    );
    label = 'Profit';
  }

  if (this.selectedChart === 'sportWinRate') {
    labels = this.stats.sports.map((item: any) =>
      this.getSportLabel(item.sport),
    );
    values = this.stats.sports.map((item: any) =>
      Number(item.winRate),
    );
    label = 'Win Rate %';
  }

  if (this.selectedChart === 'marketRoi') {
    labels = this.stats.markets.map((item: any) =>
      this.getMarketLabel(item.market),
    );
    values = this.stats.markets.map((item: any) =>
      Number(item.roi),
    );
    label = 'ROI %';
  }

  if (this.selectedChart === 'marketProfit') {
    labels = this.stats.markets.map((item: any) =>
      this.getMarketLabel(item.market),
    );
    values = this.stats.markets.map((item: any) =>
      Number(item.profit),
    );
    label = 'Profit';
  }

  if (this.selectedChart === 'marketWinRate') {
    labels = this.stats.markets.map((item: any) =>
      this.getMarketLabel(item.market),
    );
    values = this.stats.markets.map((item: any) =>
      Number(item.winRate),
    );
    label = 'Win Rate %';
  }

  if (this.analyticsChart) {
    this.analyticsChart.destroy();
  }

  this.analyticsChart = new Chart('analyticsChart', {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label,
          data: values,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

getTableData(): any[] {
  if (!this.stats) {
    return [];
  }

  if (this.selectedChart.startsWith('sport')) {
    return this.stats.sports;
  }

  return this.stats.markets;
}

getTableLabel(item: any): string {
  if (this.selectedChart.startsWith('sport')) {
    return this.getSportLabel(item.sport);
  }

  return this.getMarketLabel(item.market);
}

getTableTitle(): string {
  if (this.selectedChart.startsWith('sport')) {
    return 'Análisis por deporte';
  }

  return 'Análisis por mercado';
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
}