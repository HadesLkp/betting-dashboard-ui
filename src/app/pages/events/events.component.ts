import { Component, OnInit } from '@angular/core';
import { OddsService } from '../../services/odds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {

  events: any[] = [];

  constructor(
    private readonly oddsService: OddsService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.oddsService
      .getFormattedEvents('soccer_fifa_world_cup')
      .subscribe({
        next: (data: any[]) => {
          this.events = data;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  goToBet(event: any): void {
  this.router.navigate(['/bets'], {
    state: {
      oddsEvent: event,
    },
  });
}
}