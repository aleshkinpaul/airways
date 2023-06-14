export interface PassengersCount {
  adults: number;
  children: number;
  infants: number;
}

export interface FlightLoadInformation {
  originAirportKey: string;
  destinationAirportKey: string;
  departureDate: Date;
  returnDate: Date | null;
}

export interface IDate {
  date: Date | null;
}

export interface FlightRes {
  seats: ISeats;
  flightNumber: string;
  timeMins: number;
  form: {
    key: string;
    name: string;
    city: string;
    gmt: string;
    country: string;
  };
  to: {
    key: string;
    name: string;
    city: string;
    gmt: string;
    country: string;
  };
  takeoffDate: string;
  landingDate: string;
  price: IPrice;
}

export interface IPrice {
  eur: number;
  usd: number;
  rub: number;
  pln: number;
}

//[['1', false, '2', '3', false]]
export interface ISeats {
  total: number;
  avaible: number;
  avaibleArr?: (string | boolean)[][];
}

// export interface ISeats {
//   total: number;
//   avaible: string[];
// }
export interface FlightsRes extends FlightRes {
  otherFlights: IOtherFlights;
}

export interface IOtherFlights {
  '1'?: FlightRes;
  '2'?: FlightRes;
  '3'?: FlightRes;
  '4'?: FlightRes;
  '5'?: FlightRes;
  '-5'?: FlightRes;
  '-4'?: FlightRes;
  '-3'?: FlightRes;
  '-2'?: FlightRes;
  '-1'?: FlightRes;
}

export interface IAlternativeFlight {
  index: number;
  takeoffDate?: string;
  price?: IPrice;
  seats?: ISeats;
}

export interface AirportsRes {
  key: string;
  country: string;
  city: string;
  name: string;
}
