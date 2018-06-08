import { TestBed, inject } from '@angular/core/testing';

import { RedirectLoginService } from './redirect-login.service';

describe('RedirectLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectLoginService]
    });
  });

  it('should be created', inject([RedirectLoginService], (service: RedirectLoginService) => {
    expect(service).toBeTruthy();
  }));
});
