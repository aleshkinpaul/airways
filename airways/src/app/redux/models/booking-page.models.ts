import { FlightRes, PassengersCount } from '@redux/models/main-page.models';

export interface SelectedFlight {
  twoWays: boolean;
  forwardFlight: FlightRes;
  backFlight?: FlightRes;
}

export interface passenger {
  firstName: string;
  lastName: string;
  gender: string;
  birthdayDate: string;
  invalid: string;
  baggageBig: number;
  baggageSmall: number;
  seat: string;
}

export interface PassengersDetails {
  countryCode: string;
  phone: string;
  email: string;
}

export interface PassengerInfo {
  adult: passenger[];
  child: passenger[];
  infant: passenger[];
  details: PassengersDetails;
}

export interface ReadyFlight {
  flightNumber: string;
  flight: string[];
  tripType: string;
  prise: number;
}

export interface ReviewPageInfo {
  flightNumber: string;
  flight: string[];
  tripType: string;
}

export interface AllInformation {
  flights: SelectedFlight | null;
  passengersInfo: PassengerInfo | null;
  passengersCount: PassengersCount | null;
  total: Total | null;
  id: string | null;
}

export interface PersonTotal {
  name: string;
  count: number;
  fare: number;
  tax: number;
  allPrice: number;
}

export interface Total {
  adult: PersonTotal;
  child: PersonTotal;
  infant: PersonTotal;
  totalPrice: number;
}

export interface EditFlight {
  id: string;
  flights: SelectedFlight;
  passengersInfo: PassengerInfo;
  passengersCount: PassengersCount;
  totalPrice: Total;
}

export interface SelectedFlightCounter {
  value: number;
}
