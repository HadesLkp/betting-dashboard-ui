import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BetsComponent } from './pages/bets/bets.component';
import { BankrollComponent } from './pages/bankroll/bankroll.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'bets', component: BetsComponent },
  { path: 'bankroll', component: BankrollComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}