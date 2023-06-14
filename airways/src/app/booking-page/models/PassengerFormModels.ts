import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface AllPassengerFormGroup {
  adult: FormArray<FormGroup<PassengerFormGroup>>;
  child: FormArray<FormGroup<PassengerFormGroup>>;
  infant: FormArray<FormGroup<PassengerFormGroup>>;
  details: FormGroup<DetailsFormGroup>;
}

export interface PassengerFormGroup {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  gender: FormControl<string | null>;
  birthdayDate: FormControl<string | null>;
  invalid: FormControl<string | null>;
  baggageBig: FormControl<number | null>;
  baggageSmall: FormControl<number | null>;
  seat: FormControl<string | null>;
}

export interface DetailsFormGroup {
  countryCode: FormControl<string | null>;
  phone: FormControl<string | null>;
  email: FormControl<string | null>;
}

export interface CountryCodeFormGroup {
  country: FormControl<string | null>;
  value: FormControl<string | null>;
}
