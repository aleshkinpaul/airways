import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailsFormGroup } from '@booking/models/PassengerFormModels';
import { countryCode } from '@core/consts/countryCode';

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(
//       control &&
//       control.invalid &&
//       (control.dirty || control.touched || isSubmitted)
//     );
//   }
// }

@Component({
  selector: 'app-contact-details-form',
  templateUrl: './contact-details-form.component.html',
  styleUrls: ['./contact-details-form.component.scss'],
})
export class ContactDetailsFormComponent {
  public countryCode = countryCode;

  @Input() details!: FormGroup<DetailsFormGroup>;
}
