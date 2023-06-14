import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {
  DEFAULT_ALTERNATIVE_FLIGHTS_ON_SCREEN,
  DATE_IN_THE_PAST_MESSAGE,
  NO_TICKETS_MESSAGE,
} from '@core/consts/booking';
import { Store } from '@ngrx/store';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { SelectedFlightCounter } from '@redux/models/booking-page.models';
import {
  FlightRes,
  FlightsRes,
  IAlternativeFlight,
  IOtherFlights,
  IPrice,
} from '@redux/models/main-page.models';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-flight-details',
  templateUrl: './booking-flight-details.component.html',
  styleUrls: ['./booking-flight-details.component.scss'],
})
export class BookingFlightDetailsComponent implements OnInit, OnChanges {
  @Input() flightInfo?: FlightsRes;
  @Input() isBackFlight = false;

  public flightTitle = '';
  public chosenCurrency = 'EUR';
  public price?: number = 0;
  public alternativeFlights: IAlternativeFlight[] = [];
  public activeIndex = 0;
  public activeFlight?: FlightRes;
  public isFlightSelected = false;
  public selectedFlightCounterValue = 0;

  private currencyInfo$: Observable<string> = this.store.select(
    SettingsSelectors.CurrencySelector
  );

  private alternativeFlightOnScreen: number = DEFAULT_ALTERNATIVE_FLIGHTS_ON_SCREEN;

  private selectedFlight$!: Observable<FlightRes | null>;

  private selectedFlightCounter$: Observable<SelectedFlightCounter> =
    this.store.select(BookingSelectors.selectedFlightCounterSelector);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.selectedFlight$ = !this.isBackFlight
      ? this.store.select(BookingSelectors.selectForwardFlightSelector)
      : this.store.select(BookingSelectors.selectBackFlightSelector);
    this.currencyInfo$.subscribe((storeCurrency) => {
      this.chosenCurrency = storeCurrency;
      this.updateActiveFlight();
    });
    this.selectedFlightCounter$.subscribe(
      (storeCounter) => (this.selectedFlightCounterValue = storeCounter.value)
    );
    this.selectedFlight$.subscribe((flightInfo) => {
      if (flightInfo) {
        this.activeFlight = flightInfo;
        this.isFlightSelected = true;
      }
    });
  }

  ngOnChanges(): void {
    this.flightTitle = `${this.flightInfo?.form.city} to ${this.flightInfo?.to.city}`;
    this.updateActiveFlight();
    this.getAlternativeFlightsArray();
  }

  increaseActiveIndex(): void {
    if (this.activeIndex < this.alternativeFlightOnScreen) {
      this.activeIndex++;
      this.updateActiveFlight();
    }
    this.getNoTicketsMessage();
  }

  decreaseActiveIndex(): void {
    if (this.activeIndex > -this.alternativeFlightOnScreen) {
      this.activeIndex--;
      this.updateActiveFlight();
    }
    this.getNoTicketsMessage();
  }

  selectFlight(): void {
    this.isFlightSelected = true;
    this.store.dispatch(
      BookingActions.SelectedFlightCounter({
        value: this.selectedFlightCounterValue + 1,
      })
    );
    if (this.isBackFlight)
      this.store.dispatch(BookingActions.SelectBackFlight(this.activeFlight!));
    if (!this.isBackFlight)
      this.store.dispatch(
        BookingActions.SelectForwardFlight(this.activeFlight!)
      );
  }

  editFlight(): void {
    this.isFlightSelected = false;
    this.store.dispatch(
      BookingActions.SelectedFlightCounter({
        value: this.selectedFlightCounterValue - 1,
      })
    );
  }

  updateActiveFlight(): void {
    this.activeFlight =
      !this.isFlightSelected && this.activeIndex === 0
        ? this.flightInfo
        : this.flightInfo?.otherFlights[
            this.activeIndex.toString() as keyof IOtherFlights
          ];
    this.price =
      this.activeFlight?.price[
        this.chosenCurrency.toLowerCase() as keyof IPrice
      ] || 0;
  }

  showAlternativeFlight(flightIndex: number): boolean {
    return (
      Math.abs(this.activeIndex - flightIndex) <= this.alternativeFlightOnScreen / 2 ||
        (this.activeIndex >= this.alternativeFlightOnScreen / 2 && flightIndex > 0) ||
        (this.activeIndex <= -this.alternativeFlightOnScreen / 2 && flightIndex < 0)
    );
  }

  getAlternativeFlightsArray(): void {
    this.alternativeFlights = [];
    for (
      let ind = -this.alternativeFlightOnScreen;
      ind <= this.alternativeFlightOnScreen;
      ind++
    ) {
      const alternativeFlightInfo =
        ind === 0
          ? this.flightInfo
          : this.flightInfo?.otherFlights[
              ind.toString() as keyof IOtherFlights
            ];
      this.alternativeFlights.push({
        index: ind,
        takeoffDate:
          alternativeFlightInfo?.takeoffDate ||
          this.addDays(new Date(this.flightInfo?.takeoffDate!), ind),
        price: alternativeFlightInfo?.price,
        seats: alternativeFlightInfo?.seats,
      });
    }
  }

  addDays(date: Date, days: number): string {
    date.setDate(date.getDate() + days);
    return date.toString();
  }

  getNoTicketsMessage(): string {
    const currentDate = new Date().getTime();
    const activeFlightDate = new Date(
      this.addDays(new Date(this.flightInfo!.takeoffDate), this.activeIndex)
    ).getTime();
    return activeFlightDate < currentDate
      ? DATE_IN_THE_PAST_MESSAGE
      : NO_TICKETS_MESSAGE;
  }
}
