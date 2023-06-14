import { Component, Input, OnInit } from '@angular/core';
import {
  PassengerInfo,
  SelectedFlight,
  Total,
} from '@redux/models/booking-page.models';
import { Store } from '@ngrx/store';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';
import { CurrencyType } from '@redux/models/settings.models';
import { Observable } from 'rxjs';
import { BookingActions } from '@redux/actions/booking-page.actions';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrls: ['./total.component.scss'],
})
export class TotalComponent implements OnInit {
  @Input() passengersInfo!: PassengerInfo;
  @Input() flight!: SelectedFlight;
  currency$: Observable<CurrencyType> = this.store.select(
    SettingsSelectors.CurrencySelector
  );
  public total!: Total;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.addTotal();
    this.store.dispatch(BookingActions.AddTotalPrice(this.total));
  }

  private addTotal(): void {
    const flightPrice = this.oneManPrice(this.flight);
    const taxPrice = flightPrice / 10;
    const adult = this.addPersonTotal(flightPrice, taxPrice, 'adult');
    const child = this.addPersonTotal(flightPrice, taxPrice, 'child');
    const infant = this.addPersonTotal(flightPrice, taxPrice, 'infant');
    const totalPrice = [adult, child, infant].reduce(
      (acc, el) => (acc += +el.allPrice),
      0
    );
    this.total = {
      adult,
      child,
      infant,
      totalPrice,
    };
  }

  private addPersonTotal(
    flightPrice: number,
    taxPrice: number,
    personName: 'adult' | 'child' | 'infant'
  ) {
    const name = personName;
    let modifier = 1;
    if (name === 'child') modifier = 0.7;
    else if (name === 'infant') modifier = 0.2;

    const count = +this.passengersInfo[name].length + 1;
    const fare = flightPrice * count * modifier;
    const tax = this.allTax(taxPrice, modifier, name);
    const allPrice = fare + tax;
    return {
      name,
      count,
      fare,
      tax,
      allPrice,
    };
  }

  private allTax(
    taxPrice: number,
    modifier: number,
    personName: 'adult' | 'child' | 'infant'
  ): number {
    const bigBaggagePrice = 150;
    const smallBaggagePrice = 50;
    let totalTaxPrice = 0;
    this.passengersInfo[personName].forEach((el) => {
      totalTaxPrice +=
        el.baggageBig * bigBaggagePrice + el.baggageSmall * smallBaggagePrice;
    });

    return Math.round((totalTaxPrice + taxPrice) * modifier);
  }

  private oneManPrice(flight: SelectedFlight) {
    let price = +flight.forwardFlight.price.eur;
    if (flight.backFlight) price *= 2;
    return price;
  }
}
