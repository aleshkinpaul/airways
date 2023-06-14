import { Component, Input } from '@angular/core';
import { BaskedActions } from '@redux/actions/bascet.actions';
import { Store } from '@ngrx/store';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { Order } from '@redux/models/basket.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styleUrls: ['./card-menu.component.scss'],
})
export class CardMenuComponent {
  @Input() order!: Order;
  @Input() id!: string;

  constructor(private store: Store, private router: Router) {}

  public editFlight() {
    this.store.dispatch(
      BookingActions.EditFlightAction({
        id: this.order.id,
        flights: this.order.flights,
        passengersInfo: this.order.passengersInfo,
        passengersCount: this.order.passengersCount,
        totalPrice: this.order.total,
      })
    );
    this.router.navigate(['/booking-page']);
  }

  public deleteFlight() {
    this.store.dispatch(BaskedActions.DeleteFlight({ id: this.id }));
  }
}
