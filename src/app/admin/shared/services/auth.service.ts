import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import FBAuthResponse from 'src/app/shared/interfaces/fb-auth-response';
import { User } from 'src/app/shared/interfaces/user';
import { ErrorConstants } from 'src/constants/error-constants';
import FBConstants from 'src/constants/fb-constants';
import UrlConstants from 'src/constants/url-constants';
import { AnswerConstants } from './../../../../constants/error-constants';
import { environment } from './../../../../environments/environment';

@Injectable( { providedIn: 'root' } )
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor ( private http: HttpClient ) { }

  get token(): string {
    const expiresDate: Date = new Date( localStorage.getItem( FBConstants.EXPIRES_DATE ) );
    const currentDate: Date = new Date();

    if ( currentDate > expiresDate ) {
      this.logout();
      return null;
    } else {
      return localStorage.getItem( FBConstants.TOKEN );
    }
  }

  login( user: User ): Observable<any> {
    user.returnSecureToken = true;

    return this.http
      .post( `${ UrlConstants.SING_IN }${ environment.apiKey }`, user )
      .pipe( catchError( this.handleError.bind( this ) ) )
      .pipe( tap( this.setToken ) );
  };

  logout(): void {
    this.setToken( null );
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private setToken( response: FBAuthResponse | null ): void {
    if ( response ) {
      const expiresDate: Date = new Date( new Date().getTime() + ( +response.expiresIn * 1000 ) );
      localStorage.setItem( FBConstants.TOKEN, response.idToken );
      localStorage.setItem( FBConstants.EXPIRES_DATE, expiresDate.toString() );
    } else {
      localStorage.clear();
    }
  }

  private handleError( error: HttpErrorResponse ) {
    const { message } = error.error.error;

    switch ( message ) {
      case ErrorConstants.INVALID_EMAIL: {
        this.error$.next( AnswerConstants.INVALID_EMAIL );
        break;
      }
      case ErrorConstants.INVALID_PASSWORD: {
        this.error$.next( AnswerConstants.INVALID_PASSWORD );
        break;
      }
      case ErrorConstants.EMAIL_NOT_VALID: {
        this.error$.next( AnswerConstants.EMAIL_NOT_VALID );
        break;
      }
    }

    return throwError( error );
  }
}
