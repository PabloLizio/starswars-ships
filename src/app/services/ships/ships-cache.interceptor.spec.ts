import { TestBed } from '@angular/core/testing';

import { ShipsCacheInterceptor } from './ships-cache.interceptor';

describe('ShipsCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ShipsCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ShipsCacheInterceptor = TestBed.inject(ShipsCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
