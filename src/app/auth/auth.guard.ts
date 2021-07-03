import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAuth from './state/auth.reducer';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isloggin$: Observable<boolean>;
  constructor(private store: Store<fromAuth.AppState>, private router: Router) {
    this.isloggin$ = this.store.pipe(select(fromAuth.isAuthenticated));
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
