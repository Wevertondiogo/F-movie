import { UserDataService } from './../../shared/user-data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  signIn: FormGroup;
  isLoading: boolean;
  errorMessage: string;
  constructor(private fb: FormBuilder, private _userService: UserDataService) {}

  createSignIn() {
    this.signIn = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  ngOnInit(): void {
    this.createSignIn();
    this._userService.obsLoading.subscribe((load) => (this.isLoading = load));
  }
  ngOnDestroy(): void {
    // this._userService.getAll().subscribe().unsubscribe();
  }
  login(): void {
    this.isLoading = true;

    const email = this.signIn.get('email').value;
    const password = this.signIn.get('password').value;

    this._userService.verifyEmailAndPassword(email, password);
    this._userService.obsErrorMessage.subscribe(
      (errorMessage) => (this.errorMessage = errorMessage)
    );
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
  get errorPasswordMinLength() {
    const controller = this.signIn.get('password');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.minlength
    );
  }
}
