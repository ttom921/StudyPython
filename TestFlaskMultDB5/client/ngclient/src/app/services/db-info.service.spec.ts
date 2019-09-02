import { TestBed } from '@angular/core/testing';

import { DbInfoService } from './db-info.service';

describe('DbInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbInfoService = TestBed.get(DbInfoService);
    expect(service).toBeTruthy();
  });
});
