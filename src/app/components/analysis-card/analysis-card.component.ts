import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-analysis-card',
  templateUrl: './analysis-card.component.html',
  styleUrls: ['./analysis-card.component.scss'],
})
export class AnalysisCardComponent {
  @Input() analysis: any;
}