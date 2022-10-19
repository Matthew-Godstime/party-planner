import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly auth: Auth,
    private readonly router: Router,
    private readonly authServices: AuthService
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise((resolve, rejects) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(true)
        } else {
          this.authServices.redirectUrl = state.url;
          rejects('No user loggedIn');
          this.router.navigateByUrl('/authentication/login');
        }
      })
    });
  }
  
}
