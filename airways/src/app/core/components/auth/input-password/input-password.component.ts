import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LogInForm, SingInForm } from '@core/models/auth.models';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent {
  @Input() logInForm?: FormGroup<LogInForm>;
  @Input() singInForm?: FormGroup<SingInForm>;
  public hidePassword = true;

  get FG(): FormControl<string | null> | null {
    if (this.singInForm) return this.singInForm.controls.password;
    if (this.logInForm) return this.logInForm.controls.password;
    return null;
  }
}
