import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisCardComponent } from './analysis-card.component';

describe('AnalysisCardComponent', () => {
  let component: AnalysisCardComponent;
  let fixture: ComponentFixture<AnalysisCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalysisCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
