import { NgModule } from '@angular/core';
import { FlightsComponent } from '@booking/pages/flights/flights.component';
import { BookingPageRoutingModule } from '@booking/booking-page-routing.module';
import { BookingPageComponent } from '@booking/booking-page.component';
import { PassengersComponent } from '@booking/pages/passengers/passengers.component';
import { ReviewComponent } from '@booking/pages/review/review.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ContactDetailsFormComponent } from './components/contact-details-form/contact-details-form.component';
import { AllPassengersCardComponent } from './components/all-passengers-card/all-passengers-card.component';
import { PassengerCardComponent } from '@booking/components/passenger-card/passenger-card.component';
import { OrderComponent } from './components/order/order.component';
import { BgOrderDirective } from '@booking/directives/bg-order.directive';
import { PriseComponent } from './components/prise/prise.component';
import { OnePassengerReviewComponent } from './components/order/one-passenger-review/one-passenger-review.component';
import { TotalComponent } from './pages/review/total/total.component';
import { BookingFlightDetailsComponent } from './components/booking-flight-details/booking-flight-details.component';
import { SeatsDirective } from './directives/seats.directive';
import { AlternativeFlightCardComponent } from './components/alternative-flight-card/alternative-flight-card.component';
import { BaggageComponent } from './components/baggage/baggage.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SeatsButtonComponent } from './components/seats-button/seats-button.component';
import { PlaceDialogComponent } from './components/place-dialog/place-dialog.component';
import { DateOnTicketComponent } from '@booking/components/date-on-ticket/date-on-ticket.component';
import { ArrowButtonComponent } from '@booking/components/arrow-button/arrow-button.component';
import { BookingSummaryComponent } from './pages/booking-summary/booking-summary.component';

@NgModule({
  declarations: [
    BookingPageComponent,
    BookingSummaryComponent,
    FlightsComponent,
    PassengersComponent,
    ReviewComponent,
    ContactDetailsFormComponent,
    AllPassengersCardComponent,
    PassengerCardComponent,
    OrderComponent,
    BgOrderDirective,
    SeatsDirective,
    PriseComponent,
    OnePassengerReviewComponent,
    TotalComponent,
    BookingFlightDetailsComponent,
    AlternativeFlightCardComponent,
    BaggageComponent,
    SeatsButtonComponent,
    PlaceDialogComponent,
    ArrowButtonComponent,
    DateOnTicketComponent,
  ],
  imports: [
    CommonModule,
    BookingPageRoutingModule,
    SharedModule,
    MatDialogModule,
  ],
})
export class BookingPageModule {}
