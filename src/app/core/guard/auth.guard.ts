import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private readonly auth: Auth, private readonly router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    console.log('AuthGuard#canActivate called');
    return new Promise((resolve, rejects) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(true)
        } else {
          rejects('No user loggedIn');
          this.router.navigateByUrl('/authentication/login');
        }
      })
    });
  }
  
}
