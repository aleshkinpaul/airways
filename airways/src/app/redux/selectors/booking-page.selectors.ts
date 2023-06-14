import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingPageState } from '@redux/models/state.models';

export const selectBooking = createFeatureSelector<BookingPageState>('booking');
const idSelector = createSelector(selectBooking, (state) => state.id);
const onBookingPageSelector = createSelector(
  selectBooking,
  (state) => state.onBookingPage
);
const currentPageDirectionSelector = createSelector(
  selectBooking,
  (state) => state.currentPageDirection
);
const isEditWindowOpenSelector = createSelector(
  selectBooking,
  (state) => state.isEditWindowOpen
);
const flightsSelector = createSelector(selectBooking, (state) => state.flights);
const selectForwardFlightSelector = createSelector(
  selectBooking,
  (state) => state.selectedForwardFlight
);
const selectBackFlightSelector = createSelector(
  selectBooking,
  (state) => state.selectedBackFlight
);
const selectedFlightCounterSelector = createSelector(
  selectBooking,
  (state) => state.selectedFlightCounter
);
const passengersInfoSelector = createSelector(
  selectBooking,
  (state) => state.passengersInfo
);
const allInformationSelector = createSelector(selectBooking, (bookState) => ({
  flights: bookState.flights,
  passengersInfo: bookState.passengersInfo,
  passengersCount: bookState.passengersCount,
  total: bookState.totalPrice,
  id: bookState.id,
}));
const passengersCount = createSelector(
  selectBooking,
  (state) => state.passengersCount
);

const AvailableFlightsSelector = createSelector(
  selectBooking,
  (state) => state.availableFlights
);

export const BookingSelectors = {
  idSelector,
  onBookingPageSelector,
  currentPageDirectionSelector,
  isEditWindowOpenSelector,
  flightsSelector,
  selectForwardFlightSelector,
  selectBackFlightSelector,
  selectedFlightCounterSelector,
  passengersInfoSelector,
  allInformationSelector,
  AvailableFlightsSelector,
  passengersCount,
};
