import { TestBed } from '@angular/core/testing';

import { RestIterceptorsService } from './rest-iterceptors.service';

describe('RestIterceptorsService', () => {
  let service: RestIterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestIterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
