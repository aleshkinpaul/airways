import { createAction, props } from '@ngrx/store';
import { CurrencyI, DateI } from '@redux/models/settings.models';

const selectCurrency = createAction(
  '[Settings] Select Currency',
  props<CurrencyI>()
);

const selectDateType = createAction(
  '[Settings] Select DateType',
  props<DateI>()
);

export const SettingsActions = {
  selectDateType,
  selectCurrency,
};
