import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OddsService } from '../../services/odds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {

  eventId = '';
  event: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly oddsService: OddsService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.eventId =
      this.route.snapshot.paramMap.get('id') || '';

    this.loadEvent();
  }

  loadEvent(): void {
    this.oddsService
      .getFormattedEvents('soccer_fifa_world_cup')
      .subscribe({
        next: (events: any[]) => {

          this.event = events.find(
            (item) => item.id === this.eventId,
          );

        },
      });
  }

  selectOutcome(market: any, outcome: any): void {
    this.router.navigate(['/bets'], {
      state: {
        oddsEvent: this.event,
        selectedMarketKey: market.key,
        selectedOutcomeName: outcome.name,
      },
    });
  }

  getMarketLabel(key: string): string {
    const markets: Record<string, string> = {
      h2h: 'Ganador del partido',
      totals: 'Más/Menos goles',
      spreads: 'Hándicap',
    };

    return markets[key] || key;
  }

  getOutcomeLabel(outcome: any): string {
    const point =
      outcome.point !== undefined
        ? ` ${outcome.point}`
        : '';

    return `${outcome.name}${point}`;
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