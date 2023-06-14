import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { AuthActions } from '@redux/actions/auth.actions';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  UserLogIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LoginStart),
      concatMap((user) =>
        this.authService.getLogInToken(user).pipe(
          map((token) => AuthActions.LoginLoadedSuccess(token)),
          catchError((error) => of(AuthActions.LoginLoadedError({ error })))
        )
      )
    )
  );

  UserRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.RegistrationStart),
      concatMap((user) =>
        this.authService.getRegistrationToken(user).pipe(
          map((token) => AuthActions.RegistrationLoadedSuccess(token)),
          catchError((error) =>
            of(AuthActions.RegistrationLoadedError({ error }))
          )
        )
      )
    )
  );

  UserMe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.meStart),
      concatMap(({ token }) =>
        this.authService.getUserData(token).pipe(
          map((user) => AuthActions.meLoadedSuccess(user)),
          catchError((error) => of(AuthActions.meLoadedError({ error })))
        )
      )
    )
  );
}
