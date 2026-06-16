import { Component, OnInit } from '@angular/core';
import { BetsService } from '../../services/bets.service';
import { TranslationService } from '../../services/translation.service';
import Swal from 'sweetalert2';
interface BetForm {
  sport: string;
  eventName: string;
  market: string;
  selection: string;
  odds: number | null;
  stake: number | null;
  estimatedProbability: number | null;
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



  form: BetForm = {
    sport: '',
    eventName: '',
    market: '',
    selection: '',
    odds: null,
    stake: null,
    estimatedProbability: null,
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
    private readonly translationService: TranslationService
  ) { }

  ngOnInit(): void {
    this.loadBets();
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