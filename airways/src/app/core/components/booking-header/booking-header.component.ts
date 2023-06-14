import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MainPageActions } from '@redux/actions/main-page.actions';
import { FlightsRes } from '@redux/models/main-page.models';
import { BookingPageState } from '@redux/models/state.models';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { MainPageSelectors } from '@redux/selectors/main-page.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-booking-header',
  templateUrl: './booking-header.component.html',
  styleUrls: ['./booking-header.component.scss'],
})
export class BookingHeaderComponent implements OnDestroy {
  public availableFlights: FlightsRes[] = [];
  public departDate = '';
  public returnDate = '';
  public passengersCount = 1;
  public isEditorOpen = false;
  public currentPageDirection = 'flight';

  private availableFlights$ = this.store.select(
    BookingSelectors.AvailableFlightsSelector
  );
  private availableFlightsSubscription!: Subscription;

  private passengersCount$ = this.store.select(
    BookingSelectors.passengersCount
  );
  private passengersCountSubscription!: Subscription;

  private currentPageDirection$ = this.store.select(
    BookingSelectors.currentPageDirectionSelector
  );
  private currentPageDirectionSubscription!: Subscription;

  private isEditorOpen$ = this.store.select(MainPageSelectors.IsEditorOpen);
  private isEditorOpenSubscription!: Subscription;

  constructor(private store: Store<BookingPageState>) {
    this.availableFlightsSubscription = this.availableFlights$.subscribe(
      (flights) => {
        if (!flights) {
          return;
        }
        this.availableFlights = flights;
        this.departDate = this.convertDate(flights[0].takeoffDate);
        this.returnDate = this.convertDate(flights[1]?.takeoffDate);
      }
    );

    this.passengersCountSubscription = this.passengersCount$.subscribe(
      (passengers) => {
        if (!passengers) {
          return;
        }
        this.passengersCount =
          passengers.adults + passengers.children + passengers.infants;
      }
    );

    this.currentPageDirectionSubscription =
      this.currentPageDirection$.subscribe((direction) => {
        if (!direction) {
          return;
        }
        this.currentPageDirection = direction;
      });

    this.isEditorOpenSubscription = this.isEditorOpen$.subscribe(
      (isEditorOpen) => {
        this.isEditorOpen = isEditorOpen;
      }
    );
  }

  ngOnDestroy(): void {
    this.availableFlightsSubscription.unsubscribe();
    this.passengersCountSubscription.unsubscribe();
    this.currentPageDirectionSubscription.unsubscribe();
    this.isEditorOpenSubscription.unsubscribe();
  }

  convertDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
    });
  }

  toogleEditor(): void {
    this.isEditorOpen = !this.isEditorOpen;
    this.store.dispatch(
      MainPageActions.IsEditorOpen({ isEditorOpen: this.isEditorOpen })
    );
  }
}
