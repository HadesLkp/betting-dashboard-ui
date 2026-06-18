import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BetsComponent } from './pages/bets/bets.component';
import { BankrollComponent } from './pages/bankroll/bankroll.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { EventsComponent } from './pages/events/events.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BetsComponent,
    BankrollComponent,
    AnalyticsComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
