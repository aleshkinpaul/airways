import {
  PassengerInfo,
  ReviewPageInfo,
  SelectedFlight,
  Total,
} from '@redux/models/booking-page.models';
import { PassengersCount } from '@redux/models/main-page.models';

export type sort = 'flight' | 'Num' | 'trip' | 'date' | 'price';

export interface SortType {
  sort: sort;
}

export interface BasketFlight {
  id: string;
  isChecked: boolean;
  flight: ReviewPageInfo;
}

export interface Order {
  flights: SelectedFlight;
  passengersInfo: PassengerInfo;
  passengersCount: PassengersCount;
  total: Total;
  id: string;
  isChecked: boolean;
}

// export interface Orders {
//   [key: string]: Order;
// }
