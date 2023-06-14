import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingPageComponent } from '@booking/booking-page.component';
import { BookingSummaryComponent } from './pages/booking-summary/booking-summary.component';

const routes: Routes = [
  { path: '', component: BookingPageComponent },
  { path: 'booking-summary', component: BookingSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingPageRoutingModule {}
