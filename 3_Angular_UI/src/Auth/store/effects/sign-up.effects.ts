import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import {
  AuthenticatedActions,
  AuthSignUpActions,
} from '@auth/store/actions';
import * as fromServices from '../../services/cognito.service';
import { of } from 'rxjs';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AuthSignUpSelectors } from '../selectors';
import { AuthExtendedAppState } from '../reducers';

@Injectable()
export class SignUpEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUp),
      switchMap(({ signUpUserData }) =>
        this.cognitoService.signUp(signUpUserData).pipe(
          map(() =>
            AuthSignUpActions.signUpSuccess({
              signUpUserData,
            })
          ),
          catchError((error: any) => {
            let action$;

            if (error.code === 'UsernameExistsException') {
              action$ = of(
                AuthSignUpActions.signUpFailureUsernameAlreadyExists({
                  username: signUpUserData.username,
                })
              );
            } else {
              action$ = of(AuthSignUpActions.signUpFailure(error));
            }

            return action$;
          })
        )
      )
    )
  );

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.signUpSuccess),
      map(({ signUpUserData }) =>
        AuthSignUpActions.redirectToEmailConfirmationView({
          username: signUpUserData.username,
          password: signUpUserData.password,
        })
      )
    )
  );

  confirmRegistrationByEmailCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistrationByEmailCode),
      map((payload) => payload.code),
      withLatestFrom(
        this.store.select(AuthSignUpSelectors.getSignUpUserNameAndPassword)
      ),
      switchMap(([code, { username, password }]) => {
        if (username === undefined || password === undefined) {
          return of(
            AuthSignUpActions.confirmRegistrationByEmailCodeFailure({
              error:
                'Cannot confirm registration if username or password is missing.',
            })
          );
        }

        return this.cognitoService
          .confirmRegistrationByEmailCode(username, code)
          .pipe(
            map(() =>
              AuthSignUpActions.confirmRegistrationByEmailCodeSuccess({
                username,
                password,
                code,
              })
            ),
            catchError((error: any) => {
              if (error.code === 'CodeMismatchException') {
                return of(
                  AuthSignUpActions.confirmRegistrationByEmailCodeFailureCodeMismatch()
                );
              } else {
                return of(
                  AuthSignUpActions.confirmRegistrationByEmailCodeFailure(
                    error.code
                  )
                );
              }
            })
          );
      })
    )
  );

  sendNewEmailConfirmationCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.sendNewEmailConfirmationCode),
      withLatestFrom(this.store.select(AuthSignUpSelectors.getEmail)),
      switchMap(([payload, email]) => {
        if (email === undefined) {
          return of(
            AuthSignUpActions.sendNewEmailConfirmationCodeFailure({
              error:
                'Email is undefined where confirmation code should be sent.',
            })
          );
        }

        return this.cognitoService.sendNewEmailConfirmationCode(email).pipe(
          map(() =>
            AuthSignUpActions.sendNewEmailConfirmationCodeSuccess({
              email,
            })
          ),

          catchError((error: any) => {
            if (error.code === 'LimitExceededException') {
              return of(
                AuthSignUpActions.sendNewEmailConfirmationCodeFailureLimitExceeded()
              );
            } else {
              return of(
                AuthSignUpActions.sendNewEmailConfirmationCodeFailure({
                  error: error.code,
                })
              );
            }
          })
        );
      })
    )
  );

  authenticateUserAfterUserEmailConfirmed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticatedActions.authenticateUserAfterUserEmailConfirmed),
      switchMap(({ username, password }) =>
        this.cognitoService.authenticateUser(username, password).pipe(
          map(() =>
            AuthenticatedActions.authenticateUserAfterUserEmailConfirmedSuccess()
          ),
          catchError((error: any) =>
            of(AuthenticatedActions.authenticateUserFailure(error))
          )
        )
      )
    )
  );

  confirmRegistrationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthSignUpActions.confirmRegistrationByEmailCodeSuccess),
      map(({ username, password }) =>
        AuthenticatedActions.authenticateUserAfterUserEmailConfirmed({
          username,
          password,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cognitoService: fromServices.CognitoService,
    private store: Store<AuthExtendedAppState>
  ) {}
}
