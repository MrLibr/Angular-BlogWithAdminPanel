import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorConstants } from 'src/constants/error-constants';
import RoutingConstants from 'src/constants/routing-constants';
import { AuthService } from './../../admin/shared/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor (
    private authService: AuthService,
    private router: Router
  ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if ( this.authService.isAuth() ) {
      req = req.clone( {
        setParams: {
          auth: this.authService.token
        }
      } );
    }

    return next
      .handle( req )
      .pipe( catchError( this.handleError.bind( this ) ) );
  }

  private handleError( error: HttpErrorResponse ) {
    if ( error.status === 401 ) {
      this.authService.logout();
      this.router.navigate( [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_LOGIN_PAGE ], {
        queryParams: {
          [ ErrorConstants.AUTHORIZATION_ERROR ]: true
        }
      } );
    }
    return throwError( error );
  }
}
