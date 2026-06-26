import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBetDialogComponent } from './create-bet-dialog.component';

describe('CreateBetDialogComponent', () => {
  let component: CreateBetDialogComponent;
  let fixture: ComponentFixture<CreateBetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
