import { Injectable } from '@angular/core';

type Lang = 'es' | 'en';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLang: Lang = 'es';

  private translations: Record<Lang, Record<string, string>> = {
    es: {
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
    },
    en: {
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
    },
  };

  setLang(lang: Lang): void {
    this.currentLang = lang;
  }

  getLang(): Lang {
    return this.currentLang;
  }

  t(key: string): string {
    return this.translations[this.currentLang][key] || key;
  }
}