import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AllPassengerFormGroup,
  DetailsFormGroup,
  PassengerFormGroup,
} from '@booking/models/PassengerFormModels';
import nameValidator from '@booking/validators/name-validator';
import dateValidator from '@booking/validators/date-validator';
import phoneValidator from '@booking/validators/phone-validator';
import { Store } from '@ngrx/store';
import { PassengersCount } from '@redux/models/main-page.models';
import { Observable, Subscription } from 'rxjs';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { passenger, PassengerInfo } from '@redux/models/booking-page.models';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { DateTypeService } from '@core/services/date-type.service';
import { SettingsSelectors } from '@redux/selectors/settings.selectors';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassengersComponent implements OnInit, OnDestroy {
  public passengersForm!: FormGroup<AllPassengerFormGroup>;

  private passengersCount$: Observable<PassengersCount | null> =
    this.store.select(BookingSelectors.passengersCount);

  private passengersCountSub: Subscription = this.passengersCount$.subscribe(
    (passengers: PassengersCount | null): void => {
      if (passengers !== null) this.passengersCount = passengers;
    }
  );

  private passengersInfo$: Observable<PassengerInfo | null> = this.store.select(
    BookingSelectors.passengersInfoSelector
  );

  private passengersInfoSub: Subscription = this.passengersInfo$.subscribe(
    (passengers: PassengerInfo | null): void => {
      this.passengersInfo = passengers;
    }
  );

  private passengersCount!: PassengersCount;
  private passengersInfo!: PassengerInfo | null;

  dateType$ = this.store.select(SettingsSelectors.DateTypeSelector);
  dateTypeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private dateTypeService: DateTypeService
  ) {
    this.dateTypeSubscription = this.dateType$.subscribe((dateType) => {
      this.dateTypeService.changeDateType(dateType);
    });
  }

  ngOnInit(): void {
    const { countryCode, phone, email } = this.getDetails();
    this.passengersForm = this.fb.group<AllPassengerFormGroup>({
      adult: this.fb.array<FormGroup<PassengerFormGroup>>([]),
      child: this.fb.array<FormGroup<PassengerFormGroup>>([]),
      infant: this.fb.array<FormGroup<PassengerFormGroup>>([]),
      details: this.fb.group<DetailsFormGroup>({
        countryCode: new FormControl(countryCode, [Validators.required]),
        phone: new FormControl(phone, [Validators.required, phoneValidator()]),
        email: new FormControl(email, [Validators.required, Validators.email]),
      }),
    });

    this.addPersonToForm(
      this.adult,
      this.passengersCount.adults,
      this.passengersInfo ? this.passengersInfo.adult : ''
    );
    this.addPersonToForm(
      this.child,
      this.passengersCount.children,
      this.passengersInfo ? this.passengersInfo.child : ''
    );
    this.addPersonToForm(
      this.infant,
      this.passengersCount.infants,
      this.passengersInfo ? this.passengersInfo.infant : ''
    );
  }

  ngOnDestroy(): void {
    this.passengersCountSub.unsubscribe();
    this.passengersInfoSub.unsubscribe();
    this.dateTypeSubscription.unsubscribe();
  }

  private addPersonToForm(
    typeOfControl: FormArray<FormGroup<PassengerFormGroup>>,
    count: number,
    passenger: passenger[] | ''
  ): void {
    for (let i = 0; i < count; i++) {
      if (passenger && passenger.length > 0) {
        count = passenger.length;
      }
      const person: FormGroup<PassengerFormGroup> = this.fb.group({
        firstName: [
          passenger ? passenger[i].firstName : '',
          [Validators.required, Validators.minLength(3), nameValidator()],
        ],
        lastName: [
          passenger ? passenger[i].lastName : '',
          [Validators.required, Validators.minLength(3), nameValidator()],
        ],
        gender: [passenger ? passenger[i].gender : '', [Validators.required]],
        birthdayDate: [
          passenger ? passenger[i].birthdayDate : '',
          [Validators.required, dateValidator()],
        ],
        invalid: passenger ? passenger[i].invalid : '',
        baggageBig: passenger ? passenger[i].baggageBig : 0,
        baggageSmall: passenger ? passenger[i].baggageSmall : 0,
        seat: [passenger ? passenger[i].seat : '', [Validators.required]],
      });
      typeOfControl.push(person);
    }
  }

  private getDetails() {
    const countryCode = this.passengersInfo
      ? this.passengersInfo.details.countryCode
      : null;
    const phone = this.passengersInfo
      ? this.passengersInfo.details.phone
      : null;
    const email = this.passengersInfo
      ? this.passengersInfo.details.email
      : null;
    return { countryCode, phone, email };
  }

  get adult(): FormArray<FormGroup<PassengerFormGroup>> {
    return this.passengersForm.controls.adult;
  }

  get child(): FormArray<FormGroup<PassengerFormGroup>> {
    return this.passengersForm.controls.child;
  }

  get infant(): FormArray<FormGroup<PassengerFormGroup>> {
    return this.passengersForm.controls.infant;
  }

  get details(): FormGroup<DetailsFormGroup> {
    return this.passengersForm.controls.details;
  }

  get allForm(): FormGroup<AllPassengerFormGroup> {
    return this.passengersForm;
  }

  goToNextPage() {
    if (this.passengersForm.valid) {
      const readyPassengers = this.passengersForm.value as PassengerInfo;
      this.store.dispatch(
        BookingActions.AddPassengersInformation(readyPassengers)
      );
      this.store.dispatch(BookingActions.OnReviewSubPage());
    }
  }

  backToFlight() {
    this.store.dispatch(BookingActions.OnFlightSubPage());
  }
}
