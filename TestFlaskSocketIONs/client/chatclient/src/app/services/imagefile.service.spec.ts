import { TestBed } from '@angular/core/testing';

import { ImagefileService } from './imagefile.service';

describe('ImagefileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagefileService = TestBed.get(ImagefileService);
    expect(service).toBeTruthy();
  });
});
