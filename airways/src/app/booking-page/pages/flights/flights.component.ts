import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ALPHABET, PLACES_PER_ROW } from '@core/consts/booking';
import { Store } from '@ngrx/store';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { SelectedFlightCounter } from '@redux/models/booking-page.models';
import { FlightRes, FlightsRes, ISeats } from '@redux/models/main-page.models';
import { AuthSelectors } from '@redux/selectors/auth.selectors';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.scss'],
})
export class FlightsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private router: Router) {
    this.IsLogInSub = this.IsLogIn$.subscribe((isLog) => {
      this.isUserSignIn = isLog;
    });
  }

  public isTwoWays = false;
  public forwardFlightInfo!: FlightsRes;
  public backFlightInfo?: FlightsRes;

  public selectedForwardFlightInfo: FlightRes | null = null;
  public selectedBackFlightInfo: FlightRes | null = null;
  public selectedFlightCounterValue = 0;

  public isUserSignIn = false;

  private IsLogIn$ = this.store.select(AuthSelectors.IsLogIn);
  private IsLogInSub!: Subscription;

  private flightsInfo$: Observable<FlightsRes[] | null> = this.store.select(
    BookingSelectors.AvailableFlightsSelector
  );

  private selectedForwardFlightInfo$: Observable<FlightRes | null> =
    this.store.select(BookingSelectors.selectForwardFlightSelector);

  private selectedBackFlightInfo$: Observable<FlightRes | null> =
    this.store.select(BookingSelectors.selectBackFlightSelector);

  private selectedFlightCounter$: Observable<SelectedFlightCounter> =
    this.store.select(BookingSelectors.selectedFlightCounterSelector);

  ngOnInit(): void {
    this.flightsInfo$.subscribe((event) => {
      if (event && event?.length > 0) {
        this.isTwoWays = event.length > 1;
        this.forwardFlightInfo = event?.[0];
        if (this.isTwoWays) this.backFlightInfo = event?.[1];
      }
    });
    this.selectedForwardFlightInfo$.subscribe((storeFlightInfo) => {
      if (storeFlightInfo) this.selectedForwardFlightInfo = storeFlightInfo;
    });
    this.selectedBackFlightInfo$.subscribe((storeFlightInfo) => {
      if (storeFlightInfo) this.selectedBackFlightInfo = storeFlightInfo;
    });
    this.selectedFlightCounter$.subscribe(
      (storeCounter) => (this.selectedFlightCounterValue = storeCounter.value)
    );
  }

  ngOnDestroy(): void {
    this.IsLogInSub.unsubscribe();
  }

  checkAllFlightsSelected() {
    return (
      (this.isTwoWays && this.selectedFlightCounterValue === 2) ||
      (!this.isTwoWays && this.selectedFlightCounterValue === 1)
    );
  }

  logForm(): void {
    if (this.checkAllFlightsSelected() && this.selectedForwardFlightInfo)
      this.store.dispatch(
        BookingActions.AddSelectedFlight({
          twoWays: this.isTwoWays,
          forwardFlight: {
            ...this.selectedForwardFlightInfo,
            seats: {
              total: this.selectedForwardFlightInfo.seats.total,
              avaible: this.selectedForwardFlightInfo.seats.avaible,
              avaibleArr: this.generateFreePlaces(
                this.selectedForwardFlightInfo?.seats
              ),
            },
          },
          backFlight:
            this.isTwoWays && this.selectedBackFlightInfo
              ? {
                  ...this.selectedBackFlightInfo,
                  seats: {
                    total: this.selectedBackFlightInfo.seats.total,
                    avaible: this.selectedBackFlightInfo.seats.avaible,
                    avaibleArr: this.generateFreePlaces(
                      this.selectedBackFlightInfo?.seats
                    ),
                  },
                }
              : undefined,
        })
      );
    this.store.dispatch(BookingActions.OnPassengersSubPage());
  }

  generateFreePlaces(seats: ISeats): (string | boolean)[][] {
    const rowCount: number = Math.floor(seats.total / PLACES_PER_ROW);
    const lettersArr: string[] = ALPHABET.slice(0, PLACES_PER_ROW);
    const availablePlaces: (string | boolean)[][] = new Array(rowCount).fill(
      false
    );
    const availablePlacesFlatArray: string[] = [];
    const isIncompleteRow: boolean =
      seats.total / PLACES_PER_ROW > Math.floor(seats.total / PLACES_PER_ROW);
    const incompleteRowLength: number =
      seats.total - Math.floor(seats.total / PLACES_PER_ROW) * PLACES_PER_ROW;
    let ind = 0;

    availablePlaces.forEach(
      (x, ind, arr) => (arr[ind] = new Array(PLACES_PER_ROW).fill(false))
    );

    for (let i = 0; i < rowCount; i++)
      for (let j = 0; j < PLACES_PER_ROW; j++)
        availablePlacesFlatArray.push(i + 1 + lettersArr[j]);

    if (isIncompleteRow) {
      availablePlaces.push(new Array(incompleteRowLength).fill(false));
      for (let j = 0; j < incompleteRowLength; j++)
        availablePlacesFlatArray.push(rowCount + 1 + lettersArr[j]);
    }

    const tmpArray = availablePlacesFlatArray.slice(0);

    while (ind < seats.avaible) {
      const newPlace: string = tmpArray[this.getRandomInd(tmpArray.length, 0)];
      const newPlaceInd: number = availablePlacesFlatArray.indexOf(newPlace);
      const newPlaceRowInd: number = Math.floor(newPlaceInd / PLACES_PER_ROW);
      const newPlaceLetterInd: number =
        newPlaceInd - Math.floor(newPlaceInd / PLACES_PER_ROW) * PLACES_PER_ROW;

      availablePlaces[newPlaceRowInd][newPlaceLetterInd] =
        availablePlacesFlatArray[newPlaceInd];
      tmpArray.splice(tmpArray.indexOf(newPlace), 1);
      ind++;
    }

    return availablePlaces;
  }

  getRandomInd(max: number, step: number) {
    return Math.floor(Math.random() * max) + step;
  }

  backToMainPage(): void {
    this.router.navigate(['/main']);
  }
}
