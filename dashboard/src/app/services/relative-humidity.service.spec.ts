import { TestBed } from '@angular/core/testing';

import { RelativeHumidityService } from './relative-humidity.service';

describe('RelativeHumidityService', () => {
  let service: RelativeHumidityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelativeHumidityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
