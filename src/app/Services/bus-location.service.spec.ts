import { TestBed } from '@angular/core/testing';

import { BusLocationService } from './bus-location.service';

describe('BusLocationService', () => {
  let service: BusLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
