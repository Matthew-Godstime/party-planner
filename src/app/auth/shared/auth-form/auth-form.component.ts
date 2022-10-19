import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormData, ResetPass } from '../interfaces/form-data';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  // @Input() actionButtonText: string = 'Sign In';
  @Input() showPassInput: boolean = true;
  @Output() formSubmitted = new EventEmitter<FormData>();

  public authForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    !this.showPassInput ? this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    }) :
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }


  // public get email() : FormGroup {
  //   return this.authForm.get('email') as FormGroup
  // }


  // public get password() : FormGroup {
  //   return this.authForm.get('password') as FormGroup
  // }


  /**
   * OnSubmit:- Submit the user credentials
   */
  public onSubmit() {
    this.authForm.valid ? this.formSubmitted.emit(this.authForm.value) :
      console.log('Form is not valid yet, current value:', this.authForm.value);
  }

}
