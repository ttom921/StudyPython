import { TestBed } from '@angular/core/testing';

import { DVRService } from './dvr.service';

describe('DVRService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DVRService = TestBed.get(DVRService);
    expect(service).toBeTruthy();
  });
});
