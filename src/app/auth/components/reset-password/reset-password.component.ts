import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormData, ResetPass } from '../../shared/interfaces/form-data';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public emailForm: FormControl = new FormControl('')
  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  ngOnInit(): void {
  }

  /**
   * form submission
   */
  public resetPasswordEmail(formData: FormData) {
    this.auth.resetPassword(formData).then(() => {
      alert('Kindly check your email form a password rest link');
    }).catch(error => {
      alert(error.message);
    })
  }

}
