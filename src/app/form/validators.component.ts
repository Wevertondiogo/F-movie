import { AbstractControl } from '@angular/forms';

export class ValidatorsComponent {
  static passwordsMatch(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword');

    if (password === confirmPassword.value) return null;

    confirmPassword.setErrors({ passwordsNotMatch: true });
  }
}
