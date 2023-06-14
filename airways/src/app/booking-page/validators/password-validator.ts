import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*\s).{8,16}$/;
    const isValidPassword = passwordRegex.test(password);
    return isValidPassword
      ? null
      : {
          passwordError:
            'Password should be 8 to 16 characters long, and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
        };
  };
}
