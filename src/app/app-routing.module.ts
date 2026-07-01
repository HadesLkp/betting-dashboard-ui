import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BetsComponent } from './pages/bets/bets.component';
import { BankrollComponent } from './pages/bankroll/bankroll.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';

import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SetupBankrollComponent } from './pages/setup-bankroll/setup-bankroll.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bets',
    component: BetsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'bankroll',
    component: BankrollComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/:id',
    component: EventDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'setup-bankroll',
    component: SetupBankrollComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }