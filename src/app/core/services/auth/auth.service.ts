import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { FormData, ResetPass } from 'src/app/auth/shared/interfaces/form-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly auth: Auth) { }

  /**
   * getUser returns the current user
   */
  public getUser(): User | null {
    return this.auth.currentUser;
  }

  /**
   * The getUser() function returns the current user logged into the application.
   * This is a synchronous function, so we need to make sure the object is ready to
   * be used before calling it.
   * For example, if we call it first thing when loading the service, we risk it returning
   * undefined/null even when there’s a logged-in user.
   * That’s where the getUser()$ function comes in. It creates an observable of
   * that response and subscribes to the result so that we can call it more safely.

   * @returns the current user as an Observable
   */
  public getUser$(): Observable<User | null> {
    return of(this.getUser());
  }


  /**
   * login
   */
  public logIn({ email, password }: FormData): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  /**
   * signIn
   */
  public signUp({ email, password }: FormData): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  /**
   * resetPassword
   */
  public resetPassword({ email }: FormData): Promise<void> {
    return sendPasswordResetEmail(this.auth, email)
  }

  /**
   * logOut
   */
  public logOut(): Promise<void> {
    return signOut(this.auth);
  }
}
