import { UserDataService } from './../../shared/user-data.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  signIn: FormGroup;
  constructor(private fb: FormBuilder, private _userService: UserDataService) {}

  createSignIn() {
    this.signIn = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.createSignIn();

    this._userService
      .getAll()
      .subscribe((snapshot) => snapshot.forEach((user) => console.log(user)));
  }

  login(): void {
    const email = this.signIn.get('email').value;
    const password = this.signIn.get('password').value;

    this._userService.verifyEmailAndPassword(email, password);
  }

  // HANDLING OF SING IN ERRORS

  get requiredEmail() {
    const controller = this.signIn.get('email');
    return controller.invalid && controller.errors.required;
  }

  get invalidationErrorMessageEmail() {
    const controller = this.signIn.get('email');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.email
    );
  }

  get requiredPassword() {
    const controller = this.signIn.get('password');
    return controller.invalid && controller.errors.required;
  }
}
