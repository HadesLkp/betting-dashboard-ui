import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public readonly translationService: TranslationService,
  ) {}

  t(key: string): string {
    return this.translationService.t(key);
  }

  setLang(lang: 'es' | 'en'): void {
    this.translationService.setLang(lang);
  }

  getLang(): string {
    return this.translationService.getLang();
  }
}