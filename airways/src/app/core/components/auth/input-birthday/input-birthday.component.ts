import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SingInForm } from '@core/models/auth.models';
import { DateTypeService } from '@core/services/date-type.service';
import { Store } from '@ngrx/store';
import { MainPageState } from '@redux/models/state.models';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-birthday',
  templateUrl: './input-birthday.component.html',
  styleUrls: ['./input-birthday.component.scss'],
})
export class InputBirthdayComponent implements OnDestroy {
  @Input() singInForm!: FormGroup<SingInForm>;

  dateType$ = this.store.select(SettingsSelectors.DateTypeSelector);
  dateTypeSubscription!: Subscription;

  get FG(): FormControl<string | null> | null {
    return this.singInForm.controls.dateOfBirth;
  }

  constructor(
    private store: Store<MainPageState>,
    private dateTypeService: DateTypeService
  ) {
    this.dateTypeSubscription = this.dateType$.subscribe((dateType) => {
      this.dateTypeService.changeDateType(dateType);
    });
  }

  ngOnDestroy(): void {
    this.dateTypeSubscription.unsubscribe();
  }
}
