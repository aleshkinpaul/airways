import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function dateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const inputDate = new Date(control.value);
    return inputDate < currentDate
      ? null
      : {
          futureDate: true,
        };
  };
}
