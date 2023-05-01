import { TestBed } from '@angular/core/testing';

import { AuthOmniGuard } from './auth-omni.guard';

describe('AuthOmniGuard', () => {
  let guard: AuthOmniGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthOmniGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
