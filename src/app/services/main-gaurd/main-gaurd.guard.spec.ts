import { TestBed } from '@angular/core/testing';

import { MainGaurdGuard } from './main-gaurd.guard';

describe('MainGaurdGuard', () => {
  let guard: MainGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MainGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
