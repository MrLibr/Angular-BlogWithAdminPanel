import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import AlertConstants from 'src/constants/alert-constants';
import { AnswerConstants, ErrorConstants } from 'src/constants/error-constants';
import FormConstants from 'src/constants/form-constants';
import RoutingConstants from 'src/constants/routing-constants';
import { AlertService } from '../../shared/services/alert.service';
import { User } from './../../../shared/interfaces/user';
import { FormIncludedComponent } from './../../shared/components/form-included/form-included.component';
import { AuthService } from './../../shared/services/auth.service';


@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )
export class LoginPageComponent extends FormIncludedComponent implements OnInit, OnDestroy {

  public message: string;
  private loginSub: Subscription;

  constructor (
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      if ( params[ ErrorConstants.LOGIN_AGAIN ] ) {
        this.message = AnswerConstants.LOGIN_AGAIN;
      }

      if ( params[ ErrorConstants.AUTHORIZATION_ERROR ] ) {
        this.message = AnswerConstants.AUTHORIZATION_ERROR;
      }
    } );

    this.form = new FormGroup( {
      email: new FormControl( null, [ Validators.email, Validators.required ] ),
      password: new FormControl( null, [ Validators.minLength( 6 ), Validators.required ] )
    } );
  }

  submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    this.isSubmitted = true;

    const data: User = { ...this.form.value };

    this.loginSub = this.authService.login( data ).subscribe( () => {
      this.form.reset();
      this.router.navigate(
        [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_DASHBOARD_PAGE ]
      );
      this.isSubmitted = false;
      this.alertService.success( AlertConstants.SUCCESS_LOGIN );
    }, () => this.isSubmitted = false );
  }

  ngOnDestroy(): void {
    if ( this.loginSub ) {
      this.loginSub.unsubscribe();
    }
  }

  get emailField(): FormControl {
    return this.form.get( FormConstants.EMAIL ) as FormControl;
  }

  get passwordField(): FormControl {
    return this.form.get( FormConstants.PASSWORD ) as FormControl;
  }
}
