import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SingInForm } from '@core/models/auth.models';

@Component({
  selector: 'app-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.scss'],
})
export class InputPhoneComponent {
  @Input() singInForm!: FormGroup<SingInForm>;

  get FG(): FormControl<string | null> | null {
    return this.singInForm.controls.phone;
  }
}
