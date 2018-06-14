import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class EnsureAuthenticationService {
  constructor(private auth: AuthenticationService, private router: Router) {}
    canActivate(): boolean {
      if (localStorage.getItem('tokenApp')) {
        return true;
      }
      else {
        this.router.navigateByUrl('/login');
      return false;
    }
  }
}
