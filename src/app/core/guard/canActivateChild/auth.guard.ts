import { Injectable } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthChildGuard implements CanActivateChild {

  constructor(private readonly auth: Auth, private readonly router: Router) { }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
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
