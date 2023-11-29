import { TestBed } from '@angular/core/testing';

import { AxisUnitsService } from './axis-units.service';

describe('AxisUnitsService', () => {
  let service: AxisUnitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AxisUnitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
