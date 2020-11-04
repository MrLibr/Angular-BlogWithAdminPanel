import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../shared/interfaces/user';

@Component( {
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: [ './login-page.component.scss' ]
} )
export class LoginPageComponent implements OnInit {

  public form: FormGroup;

  constructor () { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      email: new FormControl( null, [ Validators.email, Validators.required ] ),
      password: new FormControl( null, [ Validators.minLength( 6 ), Validators.required ] )
    } );
  }

  submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    const data: User = { ...this.form.value };
  }

  get emailField(): FormControl {
    return this.form.get( 'email' ) as FormControl;
  }

  get passwordField(): FormControl {
    return this.form.get( 'password' ) as FormControl;
  }

  validateField( field: FormControl ): boolean {
    return field.invalid && field.touched;
  }
}
