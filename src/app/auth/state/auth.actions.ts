import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum UserActionTypes {
  LOGIN_START = '[Auth] Login Start',
  LOGIN_SUCCESS = '[Auth] login Success',
  LOGIN_FAIL = '[Auth] login Fail',
  CHECKING_LOGIN = '[Auth] Checking Login',
  IS_LOGIN = '[Auth] Is Login',
  LOGOUT_ACTION = '[Auth] logout',
}

export class LoginStart implements Action {
  readonly type = UserActionTypes.LOGIN_START;
  constructor(public payload: User) {
    console.log(payload);
  }
}

export class LoginSuccess implements Action {
  readonly type = UserActionTypes.LOGIN_SUCCESS;
  constructor(public payload: { user: User; redirect: boolean }) {
    console.log(payload);
  }
}

export class LoginUserFail implements Action {
  readonly type = UserActionTypes.LOGIN_FAIL;

  constructor(public payload: string) {}
}

export class validLogin implements Action {
  readonly type = UserActionTypes.CHECKING_LOGIN;
}

export class isLogin implements Action {
  readonly type = UserActionTypes.IS_LOGIN;
}

export type AuthAction =
  | LoginStart
  | LoginSuccess
  | LoginUserFail
  | validLogin
  | isLogin;
