import { FormControl } from '@angular/forms';

export interface Errors {
  loginError: string | null;
  registerError: string | null;
  meError: string | null;
}

export interface LogInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface SingInForm extends LogInForm {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<string | null>;
  dateOfBirth: FormControl<string | null>;
  countryCode: FormControl<string | null>;
  phone: FormControl<string | null>;
  citizenship: FormControl<string | null>;
  privacyPolicy: FormControl<string | null | boolean>;
}
