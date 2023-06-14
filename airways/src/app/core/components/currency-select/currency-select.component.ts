import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsActions } from '@redux/actions/settings.actions';
import { CurrencyType } from '@redux/models/settings.models';
import { SettingsState } from '@redux/models/state.models';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';

@Component({
  selector: 'app-currency-select',
  templateUrl: './currency-select.component.html',
  styleUrls: ['./currency-select.component.scss'],
})
export class CurrencySelectComponent {
  currency$ = this.store.select(SettingsSelectors.CurrencySelector);

  constructor(private store: Store<SettingsState>) {}

  changeCurrency(currency: CurrencyType) {
    this.store.dispatch(SettingsActions.selectCurrency({ currency }));
  }
}
