import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '@redux/models/basket.models';
import { PassengersCount } from '@redux/models/main-page.models';

export type SortOrdersSettings =
  | 'NoSort'
  | 'No'
  | 'Flight'
  | 'TripType'
  | 'Date'
  | 'Passengers'
  | 'Price';

export interface SortSettings {
  sortType: SortOrdersSettings;
}

@Pipe({
  name: 'sortOrders',
})
export class SortOrdersPipe implements PipeTransform {
  previousSort: SortOrdersSettings = 'No';
  previousArray!: Order[];
  isReverse = false;

  transform(
    orders: Order[],
    sortType: SortSettings | null,
    sortHelper: boolean
  ): Order[] {
    if (sortType === null || !sortHelper || sortType.sortType === 'NoSort')
      return orders;

    const newSortType = sortType.sortType;

    if (newSortType === this.previousSort && this.previousArray) {
      this.isReverse = !this.isReverse;
      this.previousArray = this.previousArray.reverse();
      return this.previousArray;
    }

    const newOrders = [...orders];
    this.previousSort = newSortType;

    return this.sortOrders(newOrders, newSortType);
  }

  private sortOrders(orders: Order[], sortType: SortOrdersSettings) {
    this.isReverse = false;
    this.previousArray = orders.sort((a, b) => this.sortCb(a, b, sortType));
    return this.previousArray;
  }

  private sortCb(a: Order, b: Order, sortType: SortOrdersSettings) {
    const getSortCB = (order: Order, type: SortOrdersSettings) =>
      this.getArgOfSort(order, type);

    const firstArg = getSortCB(a, sortType);
    const secondArg = getSortCB(b, sortType);

    if (firstArg < secondArg) return -1;
    if (firstArg > secondArg) return 1;
    return 0;
  }

  private getArgOfSort(
    order: Order,
    type: SortOrdersSettings
  ): string | number {
    if (type === 'No') return order.flights.forwardFlight.flightNumber;
    else if (type === 'Flight') return order.flights.forwardFlight.form.city;
    else if (type === 'TripType')
      return order.flights.backFlight ? 'Round Trip' : 'One way';
    else if (type === 'Date') return this.newDate(order);
    else if (type === 'Passengers') return this.allCount(order.passengersCount);
    else return order.total.totalPrice;
  }

  private newDate(order: Order): number {
    return new Date(order.flights.forwardFlight.landingDate).getTime();
  }

  private allCount(passengersCount: PassengersCount): number {
    return Object.values(passengersCount).reduce((acc, el) => acc + el, 0);
  }
}
