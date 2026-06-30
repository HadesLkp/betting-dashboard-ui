import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OddsService } from '../../services/odds.service';
import { Router } from '@angular/router';
import { PredictorService } from '../../services/predictor.service';
import { BetsService } from '../../services/bets.service';
import { AlertService } from '../../services/alert.service';

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
  betDialogData: any = null

  constructor(
    private readonly route: ActivatedRoute,
    private readonly oddsService: OddsService,
    private readonly router: Router,
    private readonly predictorService: PredictorService,
    private readonly betsService: BetsService,
    private readonly alertService: AlertService
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
      commenceTime: this.event.commenceTime,
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


  createBetFromAnalysis(analysis: any): void {
    console.log(this.event)
    this.betDialogData = {
      sport: 'Football',
      eventName: `${this.event.homeTeam} vs ${this.event.awayTeam}`,
      market: 'Match Winner',

      selection:
        analysis.selectionType === 'HOME'
          ? this.event.homeTeam
          : analysis.selectionType === 'AWAY'
            ? this.event.awayTeam
            : 'Draw',

      odds: analysis.odds,
      stake: Number(analysis.recommendedStake.toFixed(2)),
      estimatedProbability: analysis.modelProbability,
      rating: analysis.rating,

      fixtureId: analysis.fixture?.fixtureId,
      leagueId: analysis.fixture?.leagueId,
      season: analysis.fixture?.season,

      homeTeamId: analysis.teams.homeTeam.apiFootballId,
      awayTeamId: analysis.teams.awayTeam.apiFootballId,

      homeTeam: analysis.teams.homeTeam.name,
      awayTeam: analysis.teams.awayTeam.name,
    };
  }

  closeBetDialog(): void {
    this.betDialogData = null;
  }

  saveBetFromDialog(bet: any): void {
    const payload = {
      sport: bet.sport,
      eventName: bet.eventName,
      market: bet.market,
      selection: bet.selection,
      odds: Number(bet.odds),
      stake: Number(bet.stake),
      estimatedProbability: Number(bet.estimatedProbability),

      fixtureId: bet.fixtureId,
      leagueId: bet.leagueId,
      season: bet.season,

      homeTeamId: bet.homeTeamId,
      awayTeamId: bet.awayTeamId,

      homeTeam: bet.homeTeam,
      awayTeam: bet.awayTeam,
    };

    this.betsService.createBet(payload).subscribe({
      next: () => {
        this.betDialogData = null;

        this.alertService.success(
          'Apuesta creada',
          'La apuesta se guardó correctamente.',
        );
      },
      error: (error) => {
        console.error(error);

        this.alertService.error(
          'Error creando la apuesta',
          'Revisa los datos e inténtalo nuevamente.',
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