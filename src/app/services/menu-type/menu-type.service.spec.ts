import { TestBed } from '@angular/core/testing';

import { MenuTypeService } from './menu-type.service';

describe('MenuTypeService', () => {
  let service: MenuTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
