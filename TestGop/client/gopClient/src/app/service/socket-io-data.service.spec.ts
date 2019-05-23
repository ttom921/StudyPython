import { TestBed } from '@angular/core/testing';

import { SocketIoDataService } from './socket-io-data.service';

describe('SocketIoDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocketIoDataService = TestBed.get(SocketIoDataService);
    expect(service).toBeTruthy();
  });
});
