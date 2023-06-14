import { SettingsState } from '@redux/models/state.models';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectSettings = createFeatureSelector<SettingsState>('settings');

const DateTypeSelector = createSelector(
  selectSettings,
  (state) => state.dateType
);
const CurrencySelector = createSelector(
  selectSettings,
  (state) => state.currency
);

export const SettingsSelectors = {
  DateTypeSelector,
  CurrencySelector,
};
