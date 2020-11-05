import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrorConstants } from 'src/constants/error-constants';
import RoutingConstants from 'src/constants/routing-constants';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor (
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): boolean | Observable<boolean> | Promise<boolean> {
    if ( this.auth.isAuth() ) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate( [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_LOGIN_PAGE ], {
        queryParams: {
          [ ErrorConstants.LOGIN_AGAIN ]: true
        }
      } );
    }
  }

}
