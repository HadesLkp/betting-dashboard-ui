import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: any;
  chart: any;

  constructor(private readonly statsService: StatsService) { }

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

  createBankrollChart(): void {
  if (!this.stats?.history) {
    return;
  }

  const labels = this.stats.history.map((item: any) =>
    new Date(item.createdAt).toLocaleDateString(),
  );

  const values = this.stats.history.map((item: any) =>
    Number(item.amount),
  );

  if (this.chart) {
    this.chart.destroy();
  }

  this.chart = new Chart('dashboardBankrollChart', {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Bankroll',
          data: values,
          fill: false,
          lineTension: 0.3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

  ngOnInit(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {
        console.log('STATS:', data);
        this.stats = data;
        setTimeout(() => {
          this.createBankrollChart();
        }, 0);
      },
      error: (error) => {
        console.error('ERROR STATS:', error);
      },
    });
  }
}