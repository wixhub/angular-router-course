import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthStore } from "./auth.store";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthStore, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.checkIfAuthenticated();
  }

  private checkIfAuthenticated() {
    return this.auth.isLoggedIn$.pipe(
      map((loggedIn) => {
        return loggedIn ? true : this.router.parseUrl("/login");
      })
    );
  }
}
