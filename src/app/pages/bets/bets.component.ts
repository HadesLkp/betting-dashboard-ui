import { Component, OnInit } from '@angular/core';
import { BetsService } from '../../services/bets.service';
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

  constructor(private readonly betsService: BetsService) { }

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
      title: 'Sin datos',
      text: 'No hay apuestas para exportar.',
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

  deleteBet(id: number): void {
    Swal.fire({
      title: '¿Eliminar apuesta?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.betsService.deleteBet(id).subscribe({
        next: () => {

          Swal.fire({
            title: 'Eliminada',
            text: 'La apuesta fue eliminada correctamente.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });

          this.loadBets();
        },
        error: (error) => {
          console.error(error);

          Swal.fire({
            title: 'Error',
            text: 'No fue posible eliminar la apuesta.',
            icon: 'error',
          });
        },
      });
    });
  }

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

  getMarketLabel(market: string): string {
    const markets: Record<string, string> = {
      MATCH_WINNER: 'Ganador del partido',
      OVER_UNDER_GOALS: 'Más/Menos goles',
      BTTS: 'Ambos equipos marcan',
      DOUBLE_CHANCE: 'Doble oportunidad',
      DRAW_NO_BET: 'Empate no acción',
      ASIAN_HANDICAP: 'Hándicap asiático',
      FIRST_HALF_WINNER: 'Ganador primer tiempo',
      CORRECT_SCORE: 'Marcador exacto',
    };

    return markets[market] || market;
  }

  saveBet(): void {
    if (this.isEditing && this.editingBetId) {
      this.betsService.updateBet(this.editingBetId, this.form).subscribe({
        next: () => {
          Swal.fire({
            title: 'Actualizada',
            text: 'La apuesta fue actualizada correctamente.',
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
          title: 'Creada',
          text: 'La apuesta fue creada correctamente.',
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