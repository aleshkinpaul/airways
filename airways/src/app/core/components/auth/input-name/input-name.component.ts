import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SingInForm } from '@core/models/auth.models';

@Component({
  selector: 'app-input-name',
  templateUrl: './input-name.component.html',
  styleUrls: ['./input-name.component.scss'],
})
export class InputNameComponent {
  @Input() singInForm!: FormGroup<SingInForm>;
  @Input() nameType!: 'firstName' | 'lastName';

  get FG(): FormControl<string | null> | null {
    if (this.nameType === 'firstName') {
      return this.singInForm.controls.firstName;
    } else if (this.nameType === 'lastName') {
      return this.singInForm.controls.lastName;
    } else {
      return null;
    }
  }
}
