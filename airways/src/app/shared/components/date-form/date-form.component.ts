import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { DateTypeService } from '@core/services/date-type.service';
import { Store } from '@ngrx/store';
import { MainPageActions } from '@redux/actions/main-page.actions';
import { MainPageState } from '@redux/models/state.models';
import { MainPageSelectors } from '@redux/selectors/main-page.selectors';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-date-form',
  templateUrl: './date-form.component.html',
  styleUrls: ['./date-form.component.scss'],
})
export class DateFormComponent implements OnDestroy {
  public isHintVisible = false;
  public isRoundTrip = true;

  departureDate$ = this.store.select(MainPageSelectors.FlightForwardSelector);
  departureDateSubscription!: Subscription;

  returnDate$ = this.store.select(MainPageSelectors.FlightBackSelector);
  returnDateSubscription!: Subscription;

  isRoundTrip$ = this.store.select(MainPageSelectors.IsRoundTripSelector);
  isRoundTripSubscription!: Subscription;

  dateType$ = this.store.select(SettingsSelectors.DateTypeSelector);
  dateTypeSubscription!: Subscription;

  isSearchImplement$ = this.store.select(MainPageSelectors.IsSearchImplement);

  departureDateControl = new FormControl<Date | null>(null, [
    this.validateDepartureDate.bind(this),
  ]);
  returnDateControl = new FormControl<Date | null>(null, [
    this.validateReturnDate.bind(this),
  ]);

  flightForm = new FormGroup({
    departureDate: this.departureDateControl,
    returnDate: this.returnDateControl,
  });

  constructor(
    private store: Store<MainPageState>,
    private dateTypeService: DateTypeService
  ) {
    this.isRoundTripSubscription = this.isRoundTrip$.subscribe((boolean) => {
      this.isRoundTrip = boolean;

      if (!boolean) {
        this.setReturnDate(null);
      }
    });

    this.dateTypeSubscription = this.dateType$.subscribe((dateType) => {
      this.dateTypeService.changeDateType(dateType);
    });

    this.departureDateSubscription = this.departureDate$.subscribe(
      (departureDate) => {
        this.departureDateControl.setValue(departureDate);
      }
    );

    this.returnDateSubscription = this.returnDate$.subscribe((returnDate) => {
      this.returnDateControl.setValue(returnDate);
    });
  }

  ngOnDestroy(): void {
    this.isRoundTripSubscription.unsubscribe();
    this.dateTypeSubscription.unsubscribe();
    this.departureDateSubscription.unsubscribe();
    this.returnDateSubscription.unsubscribe();
  }

  setDepartureDate(departDate: Date | null) {
    this.store.dispatch(
      MainPageActions.FlightForward({
        date: departDate,
      })
    );
  }

  setReturnDate(returnDate: Date | null) {
    this.store.dispatch(
      MainPageActions.FlightBack({
        date: returnDate,
      })
    );
  }

  validateDepartureDate(control: AbstractControl) {
    const today = new Date();
    const departureDate = control.value;

    if (departureDate && departureDate < today) {
      return { departureDateInvalid: true };
    }

    return null;
  }

  validateReturnDate(control: AbstractControl) {
    const departureDate = this.departureDateControl.value;
    const returnDate = control.value;

    if (departureDate && returnDate && returnDate < departureDate) {
      return { returnDateInvalid: true };
    }

    return null;
  }

  filterDepartureDate(date: Date | null): boolean {
    const today = new Date();
    return date !== null && date >= today;
  }
}
