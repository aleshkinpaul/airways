import { Component, Input } from '@angular/core';
import { passenger } from '@redux/models/booking-page.models';

@Component({
  selector: 'app-one-passenger-review',
  templateUrl: './one-passenger-review.component.html',
  styleUrls: ['./one-passenger-review.component.scss'],
})
export class OnePassengerReviewComponent {
  @Input() passengers!: passenger[];
}
