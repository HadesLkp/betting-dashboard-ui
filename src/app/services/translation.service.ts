import { Injectable } from '@angular/core';

type Lang = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang: Lang =
    (localStorage.getItem('lang') as Lang) || 'es';

  private translations: Record<Lang, Record<string, string>> = {
    es: {
      CHART: 'Gráfica',
      NAME: 'Nombre',
      SPORT_ROI: 'ROI por deporte',
      SPORT_PROFIT: 'Profit por deporte',
      SPORT_WIN_RATE: 'Win Rate por deporte',
      MARKET_ROI: 'ROI por mercado',
      MARKET_PROFIT: 'Profit por mercado',
      MARKET_WIN_RATE: 'Win Rate por mercado',
      SELECT_SPORT: 'Selecciona deporte',
      SELECT_MARKET: 'Selecciona mercado',
      FILTER: 'Filtrar',
      CLEAR: 'Limpiar',
      EDITING_BET: 'Editando apuesta',
      CANCEL_EDIT: 'Cancelar edición',

      DASHBOARD: 'Dashboard',
      BETS: 'Apuestas',
      BANKROLL: 'Bankroll',
      ANALYTICS: 'Analítica',

      NEW_BET: 'Nueva apuesta',
      CREATE_BET: 'Crear apuesta',
      UPDATE_BET: 'Actualizar apuesta',
      FILTERS: 'Filtros',
      EXPORT_CSV: 'Exportar CSV',

      FOOTBALL: 'Fútbol',
      BASKETBALL: 'Baloncesto',
      TENNIS: 'Tenis',
      BASEBALL: 'Béisbol',
      ESPORTS: 'eSports',
      MMA: 'MMA',
      BOXING: 'Boxeo',

      MATCH_WINNER: 'Ganador del partido',
      OVER_UNDER_GOALS: 'Más/Menos goles',
      BTTS: 'Ambos equipos marcan',
      DOUBLE_CHANCE: 'Doble oportunidad',
      DRAW_NO_BET: 'Empate no acción',
      ASIAN_HANDICAP: 'Hándicap asiático',
      FIRST_HALF_WINNER: 'Ganador primer tiempo',
      CORRECT_SCORE: 'Marcador exacto',

      CURRENT_BANKROLL: 'Bankroll actual',
      INITIAL_BANKROLL: 'Bankroll inicial',
      GROWTH: 'Crecimiento',

      HISTORY: 'Historial',
      DATE: 'Fecha',

      SPORT: 'Deporte',
      MARKET: 'Mercado',
      EVENT: 'Evento',
      SELECTION: 'Selección',
      ODDS: 'Cuota',
      STAKE: 'Stake',
      RESULT: 'Resultado',
      PROFIT: 'Ganancia',
      ACTIONS: 'Acciones',

      ALL_SPORTS: 'Todos los deportes',
      ALL_MARKETS: 'Todos los mercados',
      ALL_RESULTS: 'Todos los resultados',

      FROM_DATE: 'Fecha desde',
      TO_DATE: 'Fecha hasta',

      EDIT: 'Editar',
      DELETE: 'Eliminar',
      CANCEL: 'Cancelar',

      WIN: 'Ganada',
      LOSS: 'Perdida',
      PUSH: 'Nula',
      PENDING: 'Pendiente',
      ESTIMATED_PROBABILITY: 'Probabilidad estimada',

      TOTAL_PROFIT: 'Ganancia total',
      WIN_RATE: 'Win Rate',
      WON: 'Ganadas',
      LOST: 'Perdidas',
      SETTLED: 'Cerradas',
      TOTAL: 'Total',
      BANKROLL_EVOLUTION: 'Evolución del bankroll',
      BETS_SUMMARY: 'Resumen de apuestas',
      SPORT_PERFORMANCE: 'Rendimiento por deporte',
      BET_ID: 'ID Apuesta',

      SPORT_ANALYSIS: 'Análisis por deporte',
      MARKET_ANALYSIS: 'Análisis por mercado',
      DELETE_BET: '¿Eliminar apuesta?',
      DELETE_BET_TEXT: 'Esta acción no se puede deshacer.',

      YES_DELETE: 'Sí, eliminar',

      DELETED: 'Eliminada',
      BET_DELETED_SUCCESS: 'La apuesta fue eliminada correctamente.',

      ERROR: 'Error',
      DELETE_ERROR: 'No fue posible eliminar la apuesta.',

      CREATED: 'Creada',
      BET_CREATED_SUCCESS: 'La apuesta fue creada correctamente.',

      UPDATED: 'Actualizada',
      BET_UPDATED_SUCCESS: 'La apuesta fue actualizada correctamente.',

      NO_DATA: 'Sin datos',
      NO_BETS_TO_EXPORT: 'No hay apuestas para exportar.',
    },
    en: {
      DELETE_BET: 'Delete bet?',
      DELETE_BET_TEXT: 'This action cannot be undone.',

      YES_DELETE: 'Yes, delete',

      DELETED: 'Deleted',
      BET_DELETED_SUCCESS: 'The bet was deleted successfully.',

      ERROR: 'Error',
      DELETE_ERROR: 'Could not delete the bet.',

      CREATED: 'Created',
      BET_CREATED_SUCCESS: 'The bet was created successfully.',

      UPDATED: 'Updated',
      BET_UPDATED_SUCCESS: 'The bet was updated successfully.',

      NO_DATA: 'No data',
      NO_BETS_TO_EXPORT: 'There are no bets to export.',
      SPORT_ANALYSIS: 'Sport analysis',
      MARKET_ANALYSIS: 'Market analysis',

      CHART: 'Chart',
      NAME: 'Name',
      SPORT_ROI: 'ROI by sport',
      SPORT_PROFIT: 'Profit by sport',
      SPORT_WIN_RATE: 'Win Rate by sport',
      MARKET_ROI: 'ROI by market',
      MARKET_PROFIT: 'Profit by market',
      MARKET_WIN_RATE: 'Win Rate by market',
      BET_ID: 'Bet ID',
      TOTAL_PROFIT: 'Total profit',
      WIN_RATE: 'Win Rate',
      WON: 'Won',
      LOST: 'Lost',
      SETTLED: 'Settled',
      TOTAL: 'Total',
      BANKROLL_EVOLUTION: 'Bankroll evolution',
      BETS_SUMMARY: 'Bets summary',
      SPORT_PERFORMANCE: 'Sport performance',
      ESTIMATED_PROBABILITY: 'Estimated probability',
      SELECT_SPORT: 'Select sport',
      SELECT_MARKET: 'Select market',
      FILTER: 'Filter',
      CLEAR: 'Clear',
      EDITING_BET: 'Editing bet',
      CANCEL_EDIT: 'Cancel edit',

      DASHBOARD: 'Dashboard',
      BETS: 'Bets',
      BANKROLL: 'Bankroll',
      ANALYTICS: 'Analytics',

      NEW_BET: 'New bet',
      CREATE_BET: 'Create bet',
      UPDATE_BET: 'Update bet',
      FILTERS: 'Filters',
      EXPORT_CSV: 'Export CSV',

      FOOTBALL: 'Football',
      BASKETBALL: 'Basketball',
      TENNIS: 'Tennis',
      BASEBALL: 'Baseball',
      ESPORTS: 'eSports',
      MMA: 'MMA',
      BOXING: 'Boxing',

      MATCH_WINNER: 'Match winner',
      OVER_UNDER_GOALS: 'Over/Under goals',
      BTTS: 'Both teams to score',
      DOUBLE_CHANCE: 'Double chance',
      DRAW_NO_BET: 'Draw no bet',
      ASIAN_HANDICAP: 'Asian handicap',
      FIRST_HALF_WINNER: 'First half winner',
      CORRECT_SCORE: 'Correct score',

      CURRENT_BANKROLL: 'Current bankroll',
      INITIAL_BANKROLL: 'Initial bankroll',
      GROWTH: 'Growth',

      HISTORY: 'History',
      DATE: 'Date',

      SPORT: 'Sport',
      MARKET: 'Market',
      EVENT: 'Event',
      SELECTION: 'Selection',
      ODDS: 'Odds',
      STAKE: 'Stake',
      RESULT: 'Result',
      PROFIT: 'Profit',
      ACTIONS: 'Actions',

      ALL_SPORTS: 'All sports',
      ALL_MARKETS: 'All markets',
      ALL_RESULTS: 'All results',

      FROM_DATE: 'From date',
      TO_DATE: 'To date',

      EDIT: 'Edit',
      DELETE: 'Delete',
      CANCEL: 'Cancel',

      WIN: 'Win',
      LOSS: 'Loss',
      PUSH: 'Push',
      PENDING: 'Pending',
    },
  };

  setLang(lang: Lang): void {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  getLang(): Lang {
    return this.currentLang;
  }

  t(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }
}