import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormData } from '../../shared/interfaces/form-data';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  /**
   * loginIn
   */
  public login(formData: FormData) {
    this.auth.logIn(formData).then(() => {
      this.router.navigateByUrl(`${this.auth.redirectUrl}`)
    }).catch(error => {
      alert(error.message);
    })
  }

}
