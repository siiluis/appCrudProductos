import { User } from './models/user.model';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import * as uuid from 'uuid';
const usertest: User = {
  email: 'prueba@gmail.com',
  password: '1234',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  login(user: User): Observable<User> {
    if (user.email != usertest.email) {
      return throwError('Invalid username or password');
    }
    if (user.password != usertest.password) {
      return throwError('Invalid username or password');
    }
    return of(user);
  }

  setUserInLocalStorage(user: User) {
    const userSession: User = {
      email: 'saidjsai',
      token: uuid.v4(),
    };
    localStorage.setItem('userData', JSON.stringify(userSession));
  }

  getUserFromLocalStorage() {
    const userDataString = JSON.parse(localStorage.getItem('userData'));
    if (!userDataString) {
      return of(userDataString);
    }
    return of(null);
  }
}
