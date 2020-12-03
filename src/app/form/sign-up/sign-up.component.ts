import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ValidatorsComponent } from './password-match.component';
import { User } from './../../shared/user.model';
import { UserDataService } from './../../shared/user-data.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
  signUp: FormGroup;
  isLoading: boolean;
  errorEmail: string;
  userData: any;
  constructor(private fb: FormBuilder, private _userService: UserDataService) {}

  createSignUp() {
    this.signUp = this.fb.group(
      {
        name: [
          '',
          Validators.compose([Validators.required, Validators.minLength(3)]),
        ],
        email: [
          '',
          Validators.compose([Validators.required, Validators.email]),
        ],
        password: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      { validator: ValidatorsComponent.passwordMatch }
    );
  }

  ngOnInit(): void {
    this.createSignUp();
    this._userService.obsLoading.subscribe((load) => (this.isLoading = load));
    this._userService.obsEmailError.subscribe((errorMessage) =>
      this.errorEmailMessage(errorMessage)
    );
    const body = document.querySelector('body');
    body.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') this.sendSignUp();
    });

    // this._userService.delete();
  }
  ngOnDestroy(): void {
    this._userService.getAll().subscribe().unsubscribe();
  }
  sendSignUp(): void {
    this.isLoading = true;

    const name = this.signUp.get('name').value;
    const email = this.signUp.get('email').value;
    const password = this.signUp.get('password').value;
    this._userService.createEmailAndPassword(email, password);

    this._userService
      .getAll()
      .pipe(take(1))
      .subscribe((users: User[]) => {
        if (this.searchEmail(users, email)) {
          this._userService.insert(this.signUp.value);
        }
        console.log(this.searchEmail(users, email));
        // console.log(this.userData);
        // this.signUp.reset();
      });
  }
  errorEmailMessage(errorMessage: string): void {
    if (errorMessage.includes('email')) this.errorEmail = errorMessage;
  }

  searchEmail(users: User[], email: string): boolean {
    for (let user of users) {
      if (user.email === email) {
        return false;
      } else return true;
    }
  }

  // HANDLING ERRORS

  get requiredName() {
    const controller = this.signUp.get('name');
    return controller.invalid && controller.errors.required;
  }

  get errorNameMinLength() {
    const controller = this.signUp.get('name');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.minlength
    );
  }

  get requiredEmail() {
    const controller = this.signUp.get('email');
    return controller.invalid && controller.errors.required;
  }

  get invalidationErrorMessageEmail() {
    const controller = this.signUp.get('email');
    return (
      controller.invalid &&
      (controller.dirty || controller.touched) &&
      controller.errors.email
    );
  }
  get requiredPassword() {
    const controller = this.signUp.get('password');
    return controller.invalid && controller.errors.required;
  }
  get errorPasswordMinLength() {
    const controller = this.signUp.get('password');
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
