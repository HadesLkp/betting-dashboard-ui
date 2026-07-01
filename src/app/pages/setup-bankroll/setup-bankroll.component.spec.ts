import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBankrollComponent } from './setup-bankroll.component';

describe('SetupBankrollComponent', () => {
  let component: SetupBankrollComponent;
  let fixture: ComponentFixture<SetupBankrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBankrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBankrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
