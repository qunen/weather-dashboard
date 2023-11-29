import { TestBed } from '@angular/core/testing';

import { DirectRadiationDataService } from './direct-radiation-data.service';

describe('DirectRadiationDataService', () => {
  let service: DirectRadiationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectRadiationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
