import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public readonly translationService: TranslationService,
    public authService: AuthService,
    private readonly router: Router,
  ) { }

  t(key: string): string {
    return this.translationService.t(key);
  }

  setLang(lang: 'es' | 'en'): void {
    this.translationService.setLang(lang);
    window.location.reload();
  }

  getLang(): string {
    return this.translationService.getLang();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}