import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-analysis-card',
  templateUrl: './analysis-card.component.html',
  styleUrls: ['./analysis-card.component.scss'],
})
export class AnalysisCardComponent {
  @Input() analysis: any;

  @Output() createBet = new EventEmitter<any>();

  onCreateBet(): void {
    this.createBet.emit(this.analysis);
  }
}