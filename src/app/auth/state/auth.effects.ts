import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  exhaustMap,
  tap,
  switchMap,
} from 'rxjs/operators';
import * as authActions from './auth.actions';
import { AuthService } from '../auth.service';

import { User } from './../models/user.model';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.UserActionTypes.LOGIN_START),
      map((action: authActions.LoginStart) => action.payload),
      mergeMap((user: User) =>
        this.authService.login(user).pipe(
          map((user: User) => {
            this.authService.setUserInLocalStorage(user);
            return new authActions.LoginSuccess({ user, redirect: true });
          }),
          catchError((err) => of(new authActions.LoginUserFail(err)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authActions.UserActionTypes.LOGIN_SUCCESS),
        tap((action: any) => this.router.navigate(['/productos']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
    console.log(this.actions$, 'action en contrusto');
  }
}
