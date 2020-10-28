import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsComponent } from './../validators.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;

  constructor(private fb: FormBuilder) {}

  createSignUp() {
    this.signUp = this.fb.group(
      {
        nameSignUp: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        emailSignUp: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        passwordSignUp: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      { validator: ValidatorsComponent.passwordsMatch }
    );
  }

  ngOnInit(): void {
    this.createSignUp();
  }

  sendSignUp(): void {
    console.log(this.signUp.get('confirmPassword').errors);
    // this.signUp.reset();
  }

  // HANDLING ERRORS

  get requiredNameSignUp() {
    const controller = this.signUp.get('nameSignUp');
    return controller.invalid && controller.errors.required;
  }

  get errorNameMinLength() {
    const controller = this.signUp.get('nameSignUp');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.minlength
    );
  }

  get requiredEmailSignUp() {
    const controller = this.signUp.get('emailSignUp');
    return controller.invalid && controller.errors.required;
  }

  get invalidationErrorMessageEmailSignUp() {
    const controller = this.signUp.get('emailSignUp');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.email
    );
  }
  get requiredPasswordSignUp() {
    const controller = this.signUp.get('passwordSignUp');
    return controller.invalid && controller.errors.required;
  }
  get errorPasswordSignUpMinLength() {
    const controller = this.signUp.get('passwordSignUp');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.minlength
    );
  }

  get requiredConfirmPassword() {
    const controller = this.signUp.get('confirmPassword');
    return controller.invalid && controller.errors.required;
  }
  get confirmPassword() {
    const controller = this.signUp.get('confirmPassword');
    return controller.invalid && controller.errors.passwordsNotMatch;
  }
}
