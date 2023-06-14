import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@core/services/data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookingActions } from '@redux/actions/booking-page.actions';
import { MainPageActions } from '@redux/actions/main-page.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class MainEffects {
  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private router: Router
  ) {}

  loadAirports$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MainPageActions.LoadAirports),
      switchMap(() =>
        this.dataService.getAirports().pipe(
          map((airports) => MainPageActions.LoadAirportsSuccess({ airports })),
          catchError((error) =>
            of(MainPageActions.LoadAirportsError({ error }))
          )
        )
      )
    )
  );

  loadFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MainPageActions.LoadAvailableFlights),
      switchMap((action) =>
        this.dataService
          .searchFlight(
            action.originAirportKey,
            action.destinationAirportKey,
            action.departureDate,
            action.returnDate
          )
          .pipe(
            map((flights) => {
              if (this.router.url !== '/booking-page') {
                this.router.navigate(['/booking-page']);
              }
              return BookingActions.LoadAvailableFlightsSuccess({
                availableFlights: flights,
              });
            }),
            catchError((error) =>
              of(MainPageActions.LoadAvailableFlightsError({ error }))
            )
          )
      )
    )
  );
}
