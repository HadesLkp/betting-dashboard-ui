import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BankrollService } from 'src/app/services/bankroll.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private readonly authService: AuthService,
    private readonly bankrollService: BankrollService,
    private readonly router: Router,
  ) {}

  login(): void {
    this.error = '';

    this.authService.login({
      username: this.username,
      password: this.password,
    }).subscribe({
      next: () => {

        this.bankrollService.getCurrent().subscribe({
          next: () => {
            // Ya tiene bankroll
            this.router.navigate(['/']);
          },
          error: () => {
            // No tiene bankroll
            this.router.navigate(['/setup-bankroll']);
          },
        });

      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
      },
    });
  }
}