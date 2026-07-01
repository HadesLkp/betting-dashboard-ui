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
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { LoginComponent } from './pages/login/login.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AnalysisCardComponent } from './components/analysis-card/analysis-card.component';
import { CreateBetDialogComponent } from './components/create-bet-dialog/create-bet-dialog.component';
import { CardComponent } from './shared/ui/card/card.component';
import { SetupBankrollComponent } from './pages/setup-bankroll/setup-bankroll.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BetsComponent,
    BankrollComponent,
    AnalyticsComponent,
    EventsComponent,
    EventDetailComponent,
    LoginComponent,
    AnalysisCardComponent,
    CreateBetDialogComponent,
    CardComponent,
    SetupBankrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
