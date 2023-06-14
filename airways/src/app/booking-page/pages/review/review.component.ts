import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  AllInformation,
  PassengerInfo,
  SelectedFlight,
} from '@redux/models/booking-page.models';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { Router } from '@angular/router';
import { Order } from '@redux/models/basket.models';
import { BaskedActions } from '@redux/actions/bascet.actions';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnDestroy {
  public flight$: Observable<SelectedFlight | null> = this.store.select(
    BookingSelectors.flightsSelector
  );
  public passengersInfo$: Observable<PassengerInfo | null> = this.store.select(
    BookingSelectors.passengersInfoSelector
  );

  private allInfo$: Observable<AllInformation> = this.store.select(
    BookingSelectors.allInformationSelector
  );

  private allInfoSub: Subscription = this.allInfo$.subscribe(
    (allInfo) => (this.allInfo = allInfo)
  );
  private allInfo!: AllInformation;

  constructor(private store: Store, private router: Router) {}

  ngOnDestroy(): void {
    this.allInfoSub.unsubscribe();
  }

  backToPassengers(): void {
    this.store.dispatch(BookingActions.OnPassengersSubPage());
  }

  goToMainPage() {
    this.addAllInfoToStore();
    this.router.navigate(['main']);
  }

  //allInformationSelector
  goToShoping() {
    this.addAllInfoToStore();
    this.router.navigate(['shopping-card']);
  }

  addAllInfoToStore() {
    const order = { ...this.allInfo, isChecked: true } as Order;
    this.store.dispatch(BaskedActions.AddFlight(order));
  }
}
