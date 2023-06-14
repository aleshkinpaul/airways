import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SingInForm } from '@core/models/auth.models';
import { cityzenship } from '@core/consts/cityzenship';

@Component({
  selector: 'app-input-citizenship',
  templateUrl: './input-citizenship.component.html',
  styleUrls: ['./input-citizenship.component.scss'],
})
export class InputCitizenshipComponent {
  @Input() singInForm!: FormGroup<SingInForm>;
  public citizenship = cityzenship;

  get FG(): FormControl<string | null> | null {
    return this.singInForm.controls.citizenship;
  }
}
