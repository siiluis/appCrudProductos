import * as authActions from './auth.actions';
import * as fromRoot from '../../state/app-state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export interface AuthState {
  loggedIn: boolean;
  errorMsg: string;
}

export interface AppState extends fromRoot.AppState {
  auth: AuthState;
}

export const initialState: AuthState = {
  loggedIn: false,
  errorMsg: null,
};

export function authReducer(
  state: AuthState = initialState,
  action: authActions.AuthAction
): AuthState {
  switch (action.type) {
    case authActions.UserActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
      };
    case authActions.UserActionTypes.LOGIN_FAIL:
      return {
        ...state,
        errorMsg: 'Invalid user credential',
      };

    case authActions.UserActionTypes.IS_LOGIN:
      return {
        ...state,
        loggedIn: true,
      };

    default:
      return state;
  }
}

export const getLoginState = (state: AuthState) => state.loggedIn;

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isAuthenticated = createSelector(selectAuthState, getLoginState);
