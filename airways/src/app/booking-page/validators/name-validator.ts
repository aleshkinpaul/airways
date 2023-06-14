import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const name = control.value;
    const hasNumber = /\d/.test(name);

    return !hasNumber ? null : { validName: hasNumber };
  };
}
