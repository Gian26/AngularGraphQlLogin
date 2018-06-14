import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginService implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(): boolean {
    if (localStorage.getItem('tokenApp')) {
      this.router.navigateByUrl('/dashboard');
      return false;
    }
    else {
      return true;
    }
  }
}
