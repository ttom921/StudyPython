import { TestBed } from '@angular/core/testing';

import { FirmWareService } from './firm-ware.service';

describe('FirmWareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirmWareService = TestBed.get(FirmWareService);
    expect(service).toBeTruthy();
  });
});
