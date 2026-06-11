import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  stats: any;

  constructor(private readonly statsService: StatsService) {}

  ngOnInit(): void {
  this.statsService.getStats().subscribe({
    next: (data) => {
      console.log('STATS:', data);
      this.stats = data;
    },
    error: (error) => {
      console.error('ERROR STATS:', error);
    },
  });
}
}