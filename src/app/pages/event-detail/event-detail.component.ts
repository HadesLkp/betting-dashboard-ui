import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OddsService } from '../../services/odds.service';
import { Router } from '@angular/router';
import { PredictorService } from '../../services/predictor.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
})
export class EventDetailComponent implements OnInit {

  eventId = '';
  event: any;
  predictionResult: any = null;
  analyzing = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly oddsService: OddsService,
    private readonly router: Router,
    private readonly predictorService: PredictorService,
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

  analyzeOutcome(market: any, outcome: any): void {
    if (market.key !== 'h2h') {
      return;
    }

    let selectionType: 'HOME' | 'DRAW' | 'AWAY';

    if (outcome.name === this.event.homeTeam) {
      selectionType = 'HOME';
    } else if (outcome.name === this.event.awayTeam) {
      selectionType = 'AWAY';
    } else {
      selectionType = 'DRAW';
    }

    this.analyzing = true;
    this.predictionResult = null;

    this.predictorService.analyzeEvent({
      homeTeam: this.event.homeTeam,
      awayTeam: this.event.awayTeam,
      selectionType,
      odds: Number(outcome.price),
    }).subscribe({
      next: (response) => {
        this.predictionResult = response;
        this.analyzing = false;
      },
      error: (error) => {
        console.error(error);
        this.analyzing = false;
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