import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'party-planner';
  public user!: User
  constructor(private readonly auth: AuthService) { }


  ngOnInit(): void {
    
  }
  
  public get currentUser(): string | null {
    const user = this.auth.getUser();
    console.log();
    
    return user ? user.email : ''
  }
  

  public logout() {
    this.auth.logOut();
  }
}
