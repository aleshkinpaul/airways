import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PassengersCount } from '@redux/models/main-page.models';
import { SettingsState } from '@redux/models/state.models';
import { Observable, Subscription } from 'rxjs';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';
import { BookingActions } from '@redux/actions/booking-page.actions';

@Component({
  selector: 'app-passengers-form',
  templateUrl: './passengers-form.component.html',
  styleUrls: ['./passengers-form.component.scss'],
})
export class PassengersFormComponent implements OnDestroy {
  @ViewChild('passengersForm') passengersFormRef!: ElementRef;
  @ViewChild('passengersControl') passengersControlRef!: ElementRef;

  public passengers!: PassengersCount;

  public isControlVisible = false;

  passengersCount$: Observable<PassengersCount | null> = this.store.select(
    BookingSelectors.passengersCount
  );
  passengersSubscription!: Subscription;

  constructor(private store: Store<SettingsState>) {
    this.passengersSubscription = this.passengersCount$.subscribe(
      (passengers: PassengersCount | null): void => {
        if (passengers !== null) {
          this.passengers = { ...passengers };
        }
      }
    );
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: unknown) {
    const clickedOnForm =
      this.passengersFormRef?.nativeElement.contains(target);

    const clickedInsideControl =
      this.passengersControlRef?.nativeElement.contains(target);

    if (!clickedInsideControl && !clickedOnForm) {
      this.isControlVisible = false;
    }
  }

  ngOnDestroy(): void {
    this.passengersSubscription.unsubscribe();
  }

  updatePassengersState() {
    this.store.dispatch(BookingActions.PassengersCount(this.passengers));
  }

  decreasePassengersCount(type: string) {
    switch (type) {
      case 'adults': {
        if (this.passengers.adults > 1) {
          this.passengers.adults--;
          this.updatePassengersState();
        }
        break;
      }
      case 'children': {
        if (this.passengers.children > 0) {
          this.passengers.children--;
          this.updatePassengersState();
        }
        break;
      }
      case 'infants': {
        if (this.passengers.infants > 0) {
          this.passengers.infants--;
          this.updatePassengersState();
        }
        break;
      }
    }
  }

  increasePassengersCount(type: string) {
    switch (type) {
      case 'adults': {
        this.passengers.adults++;
        this.updatePassengersState();
        break;
      }
      case 'children': {
        this.passengers.children++;
        this.updatePassengersState();
        break;
      }
      case 'infants': {
        this.passengers.infants++;
        this.updatePassengersState();
        break;
      }
    }
  }
}
