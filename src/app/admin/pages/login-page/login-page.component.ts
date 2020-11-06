import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerConstants, ErrorConstants } from 'src/constants/error-constants';
import FormConstants from 'src/constants/form-constants';
import RoutingConstants from 'src/constants/routing-constants';
import { User } from './../../../shared/interfaces/user';
import { FormIncludedComponent } from './../../shared/components/form-included/form-included.component';
import { AuthService } from './../../shared/services/auth.service';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )
export class LoginPageComponent extends FormIncludedComponent implements OnInit {

  public isSubmitted: boolean;
  public message: string;

  constructor (
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    this.isSubmitted = false;
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
    this.authService.login( data ).subscribe( () => {
      this.form.reset();
      this.router.navigate(
        [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_DASHBOARD_PAGE ]
      );
      this.isSubmitted = false;
    }, () => this.isSubmitted = false );
  }

  get emailField(): FormControl {
    return this.form.get( FormConstants.EMAIL ) as FormControl;
  }

  get passwordField(): FormControl {
    return this.form.get( FormConstants.PASSWORD ) as FormControl;
  }
}
