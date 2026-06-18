import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BetsComponent } from './pages/bets/bets.component';
import { BankrollComponent } from './pages/bankroll/bankroll.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EventsComponent } from './pages/events/events.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'bets', component: BetsComponent },
  { path: 'bankroll', component: BankrollComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'events', component: EventsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}