import { Component, OnDestroy, HostListener } from '@angular/core';
import { SettingsState } from '@redux/models/state.models';
import { Store } from '@ngrx/store';
import { AirportsRes } from '@redux/models/main-page.models';
import { MainPageSelectors } from '@redux/selectors/main-page.selectors';
import { MainPageActions } from '@redux/actions/main-page.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnDestroy {
  public isRoundTrip = true;
  public originAirport: AirportsRes | null = null;
  public destinationAirport: AirportsRes | null = null;
  public departureDate: Date | null = null;
  public returnDate: Date | null = null;
  public readyForSearch = false;
  public isSearchImplement = false;

  isRoundTrip$ = this.store.select(MainPageSelectors.IsRoundTripSelector);
  isRoundTripSubscription!: Subscription;

  originAirport$ = this.store.select(MainPageSelectors.AirportForwardSelector);
  originAirportSubscription!: Subscription;

  isSearchImplement$ = this.store.select(MainPageSelectors.IsSearchImplement);
  isSearchImplementSubscription!: Subscription;

  destinationAirport$ = this.store.select(
    MainPageSelectors.AirportBackSelector
  );
  destinationAirportSubscription!: Subscription;

  departureDate$ = this.store.select(MainPageSelectors.FlightForwardSelector);
  departureDateSubscription!: Subscription;

  returnDate$ = this.store.select(MainPageSelectors.FlightBackSelector);
  returnDateSubscription!: Subscription;

  constructor(private store: Store<SettingsState>) {
    this.isRoundTripSubscription = this.isRoundTrip$.subscribe((boolean) => {
      this.isRoundTrip = boolean;
      this.checkReadyForSearch();
    });

    this.originAirportSubscription = this.originAirport$.subscribe(
      (originAirport) => {
        this.originAirport = originAirport;
        this.checkReadyForSearch();
      }
    );

    this.destinationAirportSubscription = this.destinationAirport$.subscribe(
      (destinationAirport) => {
        this.destinationAirport = destinationAirport;
        this.checkReadyForSearch();
      }
    );

    this.departureDateSubscription = this.departureDate$.subscribe(
      (departureDate) => {
        this.departureDate = departureDate;
        this.checkReadyForSearch();
      }
    );

    this.returnDateSubscription = this.returnDate$.subscribe((returnDate) => {
      this.returnDate = returnDate;
      this.checkReadyForSearch();
    });

    this.isSearchImplementSubscription = this.isSearchImplement$.subscribe(
      (isSearchImplement) => {
        this.isSearchImplement = isSearchImplement;
      }
    );
  }

  ngOnDestroy(): void {
    this.isRoundTripSubscription.unsubscribe();
    this.originAirportSubscription.unsubscribe();
    this.destinationAirportSubscription.unsubscribe();
    this.departureDateSubscription.unsubscribe();
    this.returnDateSubscription.unsubscribe();
    this.isSearchImplementSubscription.unsubscribe();
  }

  changeTripType(boolean: boolean) {
    this.store.dispatch(MainPageActions.IsRoundTrip({ isRoundTrip: boolean }));
  }

  onSubmit(event: Event) {
    event.preventDefault();

    this.checkReadyForSearch();
    if (
      this.originAirport !== null &&
      this.destinationAirport !== null &&
      this.departureDate !== null &&
      this.readyForSearch
    ) {
      this.store.dispatch(
        MainPageActions.ChangeIsSearchImplement({
          IsSearchImplement: false,
        })
      );
      this.store.dispatch(
        MainPageActions.LoadAvailableFlights({
          originAirportKey: this.originAirport.key,
          destinationAirportKey: this.destinationAirport.key,
          departureDate: this.departureDate,
          returnDate: this.returnDate,
        })
      );
    } else {
      this.store.dispatch(
        MainPageActions.ChangeIsSearchImplement({
          IsSearchImplement: true,
        })
      );
    }
  }

  checkReadyForSearch() {
    if (
      this.originAirport !== null &&
      this.destinationAirport !== null &&
      this.checkDepartureDate() &&
      (this.isRoundTrip ? this.checkReturnDate() : true)
    ) {
      this.readyForSearch = true;
    } else {
      this.readyForSearch = false;
    }
  }

  checkDepartureDate() {
    const today = new Date();
    if (this.departureDate !== null) {
      if (this.departureDate > today) {
        return true;
      }
    }
    return false;
  }

  checkReturnDate() {
    if (this.returnDate === null || this.departureDate === null) {
      return false;
    }

    if (this.returnDate > this.departureDate) {
      return true;
    }
    return false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      if (
        event.target.classList.contains('bg-image') ||
        document.querySelector('.footer')?.contains(event.target) ||
        (document.querySelector('.header')?.contains(event.target) &&
          !event.target.classList.contains('button__book-flights') &&
          !document.querySelector('app-date-select')?.contains(event.target))
      ) {
        this.store.dispatch(
          MainPageActions.ChangeIsShownValue({
            IsShownMainPage: false,
          })
        );
      }
    }
  }
}
