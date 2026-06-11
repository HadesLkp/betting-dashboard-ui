import { TestBed } from '@angular/core/testing';

import { BankrollService } from './bankroll.service';

describe('BankrollService', () => {
  let service: BankrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
