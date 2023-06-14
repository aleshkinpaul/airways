import { SettingsState } from '@redux/models/state.models';
import { createReducer, on } from '@ngrx/store';
import { SettingsActions } from '@redux/actions/settings.actions';

export const initialState: SettingsState = {
  currency: 'EUR',
  dateType: 'MM/DD/YYYY',
};

export const SettingsReducer = createReducer(
  initialState,
  on(SettingsActions.selectCurrency, (state, action) => ({
    ...state,
    currency: action.currency,
  })),
  on(SettingsActions.selectDateType, (state, action) => ({
    ...state,
    dateType: action.dateType,
  }))
);
