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

@NgModule({
  declarations: [
    BookingPageComponent,
    FlightsComponent,
    PassengersComponent,
    ReviewComponent,
    ContactDetailsFormComponent,
    AllPassengersCardComponent,
    PassengerCardComponent,
  ],
  imports: [CommonModule, BookingPageRoutingModule, SharedModule],
})
export class BookingPageModule {}