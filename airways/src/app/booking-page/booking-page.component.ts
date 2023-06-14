import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CurrentPageDirection } from '@redux/models/state.models';
import { BookingSelectors } from '@redux/selectors/booking-page.selectors';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss'],
})
export class BookingPageComponent {
  public step$: Observable<CurrentPageDirection> = this.store.select(
    BookingSelectors.currentPageDirectionSelector
  );

  constructor(private store: Store) {}
}
