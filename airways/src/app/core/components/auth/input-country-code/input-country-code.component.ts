import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SingInForm } from '@core/models/auth.models';
import { countryCode } from '@core/consts/countryCode';

@Component({
  selector: 'app-input-country-code',
  templateUrl: './input-country-code.component.html',
  styleUrls: ['./input-country-code.component.scss'],
})
export class InputCountryCodeComponent {
  @Input() singInForm!: FormGroup<SingInForm>;
  public countryCode = countryCode;

  get FG(): FormControl<string | null> | null {
    return this.singInForm.controls.countryCode;
  }
}
