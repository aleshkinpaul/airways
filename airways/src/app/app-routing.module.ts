import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '@core/pages/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'booking-page',
    loadChildren: () =>
      import('./booking-page/booking-page.module').then(
        (m) => m.BookingPageModule
      ),
  },
  {
    path: 'shopping-card',
    loadChildren: () =>
      import('./shopping-card/shopping-card.module').then(
        (m) => m.ShoppingCardModule
      ),
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
