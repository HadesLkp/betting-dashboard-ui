import { Component, OnInit } from '@angular/core';
import { BankrollService } from '../../services/bankroll.service';
import { Chart } from 'chart.js';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-bankroll',
  templateUrl: './bankroll.component.html',
  styleUrls: ['./bankroll.component.scss'],
})
export class BankrollComponent implements OnInit {
  bankroll: any;
  history: any[] = [];
  chart: any;

  constructor(
    private readonly bankrollService: BankrollService,
    private readonly translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.loadBankroll();
  }

  t(key: string): string {
  return this.translationService.t(key);
}

  loadBankroll(): void {
    this.bankrollService.getCurrent().subscribe({
      next: (data) => {
        this.bankroll = data;
      },
      error: (error) => {
        console.error(error);
      },
    });

    this.bankrollService.getHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.createChart();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createChart(): void {
    const labels = this.history.map((item) =>
      new Date(item.createdAt).toLocaleDateString(),
    );

    const values = this.history.map((item) =>
      Number(item.amount),
    );

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('bankrollChart', {
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
}