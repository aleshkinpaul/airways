import { Component, Input } from '@angular/core';
import { PassengerInfo } from '@redux/models/booking-page.models';
import { FlightRes } from '@redux/models/main-page.models';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  @Input() data?: FlightRes;
  @Input() passengers!: PassengerInfo;
}
