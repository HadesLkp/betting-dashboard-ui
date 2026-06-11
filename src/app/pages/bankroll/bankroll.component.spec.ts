import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankrollComponent } from './bankroll.component';

describe('BankrollComponent', () => {
  let component: BankrollComponent;
  let fixture: ComponentFixture<BankrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
