import { Component, OnInit } from '@angular/core';
import { BetsService } from '../../services/bets.service';
import { TranslationService } from '../../services/translation.service';
import Swal from 'sweetalert2';
import { OddsService } from '../../services/odds.service';
import { BankrollService } from '../../services/bankroll.service';
interface BetForm {
  sport: string;
  eventName: string;
  market: string;
  selection: string;
  odds: number | null;
  stake: number | null;
  estimatedProbability: number | null;
  oddsEventId: string;
  bookmaker: string;
  marketKey: string;
}

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss'],
})
export class BetsComponent implements OnInit {
  bets: any[] = [];
  isEditing = false;
  editingBetId: number | null = null;
  oddsEvents: any[] = [];
  selectedOddsEventId = '';
  selectedOutcomeName = '';
  selectedOutcomes: any[] = [];
  betCreationMode: 'manual' | 'api' = 'manual';
  selectedMarketKey = '';
  selectedMarkets: any[] = [];
  bankroll: any

  form: BetForm = {
    sport: '',
    eventName: '',
    market: '',
    selection: '',
    odds: null,
    stake: null,
    estimatedProbability: null,
    oddsEventId: '',
    bookmaker: '',
    marketKey: '',
  };

  filters = {
    sport: '',
    market: '',
    result: '',
    from: '',
    to: '',
  };

  constructor(
    private readonly betsService: BetsService,
    private readonly oddsService: OddsService,
    private readonly translationService: TranslationService,
    private readonly bankrollService: BankrollService
  ) { }

  ngOnInit(): void {
    this.loadBets();
    this.loadOddsEvents();
    this.loadBankroll();

    const navigation = history.state;

    if (navigation?.oddsEvent) {
      this.betCreationMode = 'api';

      const event = navigation.oddsEvent;

      this.oddsEvents = [event];
      this.selectedOddsEventId = event.id;

      this.selectOddsEvent();
    }

    if (navigation?.oddsEvent) {
      this.betCreationMode = 'api';

      const event = navigation.oddsEvent;

      this.oddsEvents = [event];
      this.selectedOddsEventId = event.id;

      this.selectOddsEvent();

      if (navigation.selectedMarketKey) {
        this.selectedMarketKey = navigation.selectedMarketKey;
        this.selectMarket();
      }

      if (navigation.selectedOutcomeName) {
        this.selectedOutcomeName = navigation.selectedOutcomeName;
        this.selectOutcome();
      }
    }
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
  }

  getBetRating(): string {
    const edge = this.getEdge();

    if (edge <= 0) {
      return 'NO_VALUE';
    }

    if (edge < 2) {
      return 'SMALL';
    }

    if (edge < 5) {
      return 'GOOD';
    }

    if (edge < 10) {
      return 'VERY_GOOD';
    }

    return 'PREMIUM';
  }

  getBetRatingLabel(): string {
    const rating = this.getBetRating();

    const labels: Record<string, string> = {
      NO_VALUE: '⚪ Sin valor',
      SMALL: '🟡 Value pequeño',
      GOOD: '🟢 Buena value bet',
      VERY_GOOD: '🔵 Value alta',
      PREMIUM: '🔥 Value premium',
    };

    return labels[rating];
  }

  getBetStars(): string {
    const rating = this.getBetRating();

    const stars: Record<string, string> = {
      NO_VALUE: '☆☆☆☆☆',
      SMALL: '★★☆☆☆',
      GOOD: '★★★☆☆',
      VERY_GOOD: '★★★★☆',
      PREMIUM: '★★★★★',
    };

    return stars[rating];
  }

  getExpectedValuePerUnit(): number {
    if (!this.form.odds || !this.form.estimatedProbability) {
      return 0;
    }

    const odds = Number(this.form.odds);
    const probability = Number(this.form.estimatedProbability) / 100;

    return probability * (odds - 1) - (1 - probability);
  }

  getExpectedValueForStake(): number {
    if (!this.form.stake) {
      return 0;
    }

    return Number(this.form.stake) * this.getExpectedValuePerUnit();
  }

  getKellyStake(): number {
    if (!this.bankroll?.currentAmount) {
      return 0;
    }

    return Number(this.bankroll.currentAmount) * (this.getKellyPercentage() / 100);
  }

  loadOddsEvents(): void {
    this.oddsService
      .getFormattedEvents('soccer_fifa_world_cup')
      .subscribe({
        next: (data: any[]) => {
          this.oddsEvents = data;
        },
        error: (error: any) => {
          console.error(error);
        },
      });
  }

  changeBetCreationMode(): void {
    this.resetForm();

    this.selectedOddsEventId = '';
    this.selectedOutcomeName = '';
    this.selectedOutcomes = [];

    if (this.betCreationMode === 'api') {
      this.loadOddsEvents();
    }
  }

  autoSettle(): void {
    this.betsService.autoSettle().subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Resultados sincronizados',
          text: `Revisadas: ${response.checked}. Actualizadas: ${response.settled}.`,
          icon: 'success',
        });

        this.loadBets();
      },
      error: (error) => {
        console.error(error);

        Swal.fire({
          title: this.t('ERROR'),
          text: 'No fue posible sincronizar resultados.',
          icon: 'error',
        });
      },
    });
  }

  suggestEstimatedProbability(): void {
    if (!this.form.odds || this.form.odds <= 0) {
      return;
    }

    const impliedProbability = (1 / Number(this.form.odds)) * 100;

    const suggestedProbability = impliedProbability;

    this.form.estimatedProbability = Number(
      suggestedProbability.toFixed(2),
    );
  }

  getImpliedProbability(): number {
    if (!this.form.odds || this.form.odds <= 0) {
      return 0;
    }

    return (1 / Number(this.form.odds)) * 100;
  }

  getEdge(): number {
    if (!this.form.estimatedProbability) {
      return 0;
    }

    return Number(this.form.estimatedProbability) - this.getImpliedProbability();
  }

  isValueBet(): boolean {
    return this.getEdge() > 0;
  }

  getKellyPercentage(): number {
    if (!this.form.odds || !this.form.estimatedProbability) {
      return 0;
    }

    const odds = Number(this.form.odds);
    const probability = Number(this.form.estimatedProbability) / 100;

    const b = odds - 1;
    const q = 1 - probability;

    const kelly = (b * probability - q) / b;

    return Math.max(kelly * 100, 0);
  }

  selectOddsEvent(): void {
    const event = this.oddsEvents.find(
      (item) => item.id === this.selectedOddsEventId,
    );

    if (!event) {
      this.selectedMarkets = [];
      this.selectedOutcomes = [];
      return;
    }

    this.form.oddsEventId = event.id;
    this.form.bookmaker = event.bookmaker;

    this.form.sport = 'FOOTBALL';
    this.form.eventName = `${event.homeTeam} vs ${event.awayTeam}`;

    this.selectedMarketKey = '';
    this.selectedOutcomeName = '';

    this.selectedMarkets = event.markets || [];
    this.selectedOutcomes = [];
  }

  selectOutcome(): void {
    const outcome = this.selectedOutcomes.find(
      (item: any) => item.name === this.selectedOutcomeName,
    );

    if (!outcome) {
      return;
    }

    this.form.marketKey = this.selectedMarketKey;
    this.form.selection = outcome.name;
    this.form.odds = Number(outcome.price);
    this.form.estimatedProbability = null;

    if (this.selectedMarketKey === 'h2h') {
      this.form.market = 'MATCH_WINNER';
    }

    if (this.selectedMarketKey === 'totals') {
      this.form.market = 'OVER_UNDER_GOALS';
    }

    if (this.selectedMarketKey === 'spreads') {
      this.form.market = 'ASIAN_HANDICAP';
    }
  }

  selectMarket(): void {
    const market = this.selectedMarkets.find(
      (item) => item.key === this.selectedMarketKey,
    );

    if (!market) {
      this.selectedOutcomes = [];
      return;
    }

    this.selectedOutcomes = market.outcomes || [];

    this.selectedOutcomeName = '';
  }

  getOddsMarketLabel(key: string): string {
    const markets: Record<string, string> = {
      h2h: this.t('MATCH_WINNER'),
      totals: this.t('OVER_UNDER_GOALS'),
      spreads: this.t('ASIAN_HANDICAP'),
    };

    return markets[key] || key;
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

  editBet(bet: any): void {
    if (bet.result !== 'pending') {
      return;
    }

    this.isEditing = true;
    this.editingBetId = bet.id;

    this.form = {
      sport: bet.sport,
      eventName: bet.eventName,
      market: bet.market,
      selection: bet.selection,
      odds: Number(bet.odds),
      stake: Number(bet.stake),
      estimatedProbability: Number(bet.estimatedProbability),
      oddsEventId: '',
      bookmaker: '',
      marketKey: '',
    };
  }

  applyFilters(): void {
    this.loadBets();
  }

  exportToCsv(): void {
    if (!this.bets.length) {
      Swal.fire({
        title: this.t('NO_DATA'),
        text: this.t('NO_BETS_TO_EXPORT'),
        icon: 'info',
      });

      return;
    }

    const headers = [
      'ID',
      'Sport',
      'Market',
      'Event',
      'Selection',
      'Odds',
      'Stake',
      'Estimated Probability',
      'Result',
      'Profit',
      'Date',
    ];

    const rows = this.bets.map((bet) => [
      bet.id,
      this.getSportLabel(bet.sport),
      this.getMarketLabel(bet.market),
      bet.eventName,
      bet.selection,
      bet.odds,
      bet.stake,
      bet.estimatedProbability,
      bet.result,
      bet.profit,
      new Date(bet.placedAt).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `bets-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();

    window.URL.revokeObjectURL(url);
  }

  clearFilters(): void {
    this.filters = {
      sport: '',
      market: '',
      result: '',
      from: '',
      to: '',
    };

    this.loadBets();
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  deleteBet(id: number): void {
    Swal.fire({
      title: this.t('DELETE_BET'),
      text: this.t('DELETE_BET_TEXT'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: this.t('YES_DELETE'),
      cancelButtonText: this.t('CANCEL'),
      confirmButtonColor: '#dc3545',
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.betsService.deleteBet(id).subscribe({
        next: () => {

          Swal.fire({
            title: this.t('DELETED'),
            text: this.t('BET_DELETED_SUCCESS'),
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadBets();
        },
        error: (error) => {
          console.error(error);

          Swal.fire({
            title: this.t('ERROR'),
            text: this.t('DELETE_ERROR'),
            icon: 'error',
          });
        },
      });
    });
  }

  getSportLabel(sport: string): string {
    return this.translationService.t(sport);
  }

  getMarketLabel(market: string): string {
    return this.translationService.t(market);
  }

  saveBet(): void {
    if (this.isEditing && this.editingBetId) {
      this.betsService.updateBet(this.editingBetId, this.form).subscribe({
        next: () => {
          Swal.fire({
            title: this.t('UPDATED'),
            text: this.t('BET_UPDATED_SUCCESS'),
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });

          this.resetForm();
          this.loadBets();
        },
        error: (error: any) => {
          console.error(error);
        },
      });

      return;
    }

    this.betsService.createBet(this.form).subscribe({
      next: () => {
        Swal.fire({
          title: this.t('CREATED'),
          text: this.t('BET_CREATED_SUCCESS'),
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        this.resetForm();
        this.loadBets();
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  resetForm(): void {
    this.form = {
      sport: '',
      eventName: '',
      market: '',
      selection: '',
      odds: null,
      stake: null,
      estimatedProbability: null,
      oddsEventId: '',
      bookmaker: '',
      marketKey: '',
    };

    this.isEditing = false;
    this.editingBetId = null;
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