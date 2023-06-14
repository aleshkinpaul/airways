import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MainPageState } from '@redux/models/state.models';

export const selectMainPage = createFeatureSelector<MainPageState>('mainPage');

const IsRoundTripSelector = createSelector(
  selectMainPage,
  (state) => state.isRoundTrip
);

const AirportsSelector = createSelector(
  selectMainPage,
  (state) => state.airports
);

const FlightForwardSelector = createSelector(
  selectMainPage,
  (state) => state.flightForward
);

const FlightBackSelector = createSelector(
  selectMainPage,
  (state) => state.flightBack
);

const AirportForwardSelector = createSelector(
  selectMainPage,
  (state) => state.airportForward
);

const AirportBackSelector = createSelector(
  selectMainPage,
  (state) => state.airportBack
);

const IsShowMainFormSelector = createSelector(
  selectMainPage,
  (state) => state.isShowMainForm
);

const IsSearchImplement = createSelector(
  selectMainPage,
  (state) => state.isSearchImplement
);

const IsEditorOpen = createSelector(
  selectMainPage,
  (state) => state.isEditorOpen
);

export const MainPageSelectors = {
  AirportsSelector,
  FlightForwardSelector,
  FlightBackSelector,
  AirportForwardSelector,
  AirportBackSelector,
  IsRoundTripSelector,
  IsShowMainFormSelector,
  IsSearchImplement,
  IsEditorOpen,
};
