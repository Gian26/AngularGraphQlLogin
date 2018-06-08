import { TestBed, inject } from '@angular/core/testing';

import { EnsureAuthenticationService } from './ensure-authentication.service';

describe('EnsureAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnsureAuthenticationService]
    });
  });

  it('should be created', inject([EnsureAuthenticationService], (service: EnsureAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
