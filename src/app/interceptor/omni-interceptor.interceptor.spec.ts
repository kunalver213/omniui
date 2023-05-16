import { TestBed } from '@angular/core/testing';

import { OmniInterceptorInterceptor } from './omni-interceptor.interceptor';

describe('OmniInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OmniInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OmniInterceptorInterceptor = TestBed.inject(OmniInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
