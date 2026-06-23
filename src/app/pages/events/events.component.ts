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
  searchTerm = '';
  selectedLeague = 'soccer_fifa_world_cup';

  constructor(
    private readonly oddsService: OddsService,
    private readonly router: Router,
  ) { }

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

  get filteredEvents(): any[] {
    const term = this.searchTerm.toLowerCase().trim();

    if (!term) {
      return this.events;
    }

    return this.events.filter((event) => {
      const matchName = `${event.homeTeam} ${event.awayTeam}`.toLowerCase();

      return matchName.includes(term);
    });
  }

  goToBet(event: any): void {
    this.router.navigate(['/bets'], {
      state: {
        oddsEvent: event,
      },
    });
  }

  viewEvent(event: any): void {
    this.router.navigate([
      '/events',
      event.id,
    ]);
  }

  getTeamFlag(team: string): string {
    const flags: Record<string, string> = {
      USA: '🇺🇸',
      'United States': '🇺🇸',
      Australia: '🇦🇺',
      Scotland: '🏴',
      Morocco: '🇲🇦',
      Brazil: '🇧🇷',
      Haiti: '🇭🇹',
      Portugal: '🇵🇹',
      'DR Congo': '🇨🇩',
      England: '🏴',
      Croatia: '🇭🇷',
      Canada: '🇨🇦',
      Qatar: '🇶🇦',
      Spain: '🇪🇸',
      Colombia: '🇨🇴',
      Argentina: '🇦🇷',
      Germany: '🇩🇪',
      France: '🇫🇷',
    };

    return flags[team] || '⚽';
  }
}