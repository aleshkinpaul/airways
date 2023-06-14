import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SettingsActions } from '@redux/actions/settings.actions';
import { DateType } from '@redux/models/settings.models';
import { SettingsState } from '@redux/models/state.models';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss'],
})
export class DateSelectComponent {
  dateType$ = this.store.pipe(select(SettingsSelectors.DateTypeSelector));

  constructor(private store: Store<SettingsState>) {}

  changeDateType(dateType: DateType) {
    this.store.dispatch(SettingsActions.selectDateType({ dateType }));
  }
}
