import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormData } from '../../shared/interfaces/form-data';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  /**
   * signUp
   */
  public signUp(formData: FormData) {
    this.auth.signUp(formData).then(() => {
      this.router.navigateByUrl('/home');
    }).catch(error => {
      alert(error.message);
    })
  }

}
