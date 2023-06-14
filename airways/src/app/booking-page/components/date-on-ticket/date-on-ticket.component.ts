import { Component, Input, OnChanges } from '@angular/core';
import { FlightRes } from '@redux/models/main-page.models';

@Component({
  selector: 'app-date-on-ticket',
  templateUrl: './date-on-ticket.component.html',
  styleUrls: ['./date-on-ticket.component.scss'],
})
export class DateOnTicketComponent implements OnChanges {
  @Input() flightInfo?: FlightRes;
  @Input() isDateFrom = true;

  public flightDate?: string;
  public flightCity?: string;
  public flightGmt?: string;

  ngOnChanges(): void {
    this.flightDate = this.isDateFrom
      ? this.flightInfo?.takeoffDate
      : this.flightInfo?.landingDate;
    this.flightGmt = this.isDateFrom
      ? this.flightInfo?.form.gmt
      : this.flightInfo?.to.gmt;
    this.flightCity = this.isDateFrom
      ? this.flightInfo?.form.city
      : this.flightInfo?.to.city;
  }
}
