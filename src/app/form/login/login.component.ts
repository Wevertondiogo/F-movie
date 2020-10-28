import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signIn: FormGroup;
  constructor(private fb: FormBuilder) {}

  createSignIn() {
    this.signIn = this.fb.group({
      emailSignIn: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      passwordSignIn: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.createSignIn();
    console.log('i am here!');
  }

  sendSignIn(): void {
    console.log(this.signIn);
  }

  // HANDLING OF SING IN ERRORS

  get requiredEmailSignIn() {
    const controller = this.signIn.get('emailSignIn');
    return controller.invalid && controller.errors.required;
  }

  get invalidationErrorMessageEmailSignIn() {
    const controller = this.signIn.get('emailSignIn');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.email
    );
  }

  get requiredPasswordSignIn() {
    const controller = this.signIn.get('passwordSignIn');
    return controller.invalid && controller.errors.required;
  }
}
