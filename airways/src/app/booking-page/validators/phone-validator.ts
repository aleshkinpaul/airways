import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const phone = control.value;
    const isValidPhone = /^\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/.test(phone);
    return isValidPhone ? null : { validPhone: !isValidPhone };
  };
}
