import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import Post from 'src/app/shared/interfaces/post';
import { ErrorConstants } from 'src/constants/error-constants';
import FormConstants from 'src/constants/form-constants';
import RoutingConstants from 'src/constants/routing-constants';
import { PostsService } from './../../../shared/services/posts.service';
import { AuthService } from './../../shared/services/auth.service';


@Component( {
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: [ './create-page.component.scss' ]
} )
export class CreatePageComponent implements OnInit {

  public form: FormGroup;

  constructor (
    private posts: PostsService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup( {
      title: new FormControl( null, Validators.required ),
      text: new FormControl( null, Validators.required ),
      author: new FormControl( null, Validators.required ),
    } );
  }

  submit(): void {
    if ( this.form.invalid ) {
      return;
    }

    const post: Post = {
      ...this.form.value,
      date: new Date()
    };

    this.posts.create( post ).subscribe( () => {
      this.form.reset();
    }, this.handleError.bind( this ) );
  }

  get titleField(): FormControl {
    return this.form.get( FormConstants.TITLE ) as FormControl;
  }

  get textField(): FormControl {
    return this.form.get( FormConstants.TEXT ) as FormControl;
  }

  get authorField(): FormControl {
    return this.form.get( FormConstants.AUTHOR ) as FormControl;
  }

  validateField( field: FormControl ): boolean {
    return field.invalid && field.touched;
  }

  private handleError( error: HttpErrorResponse ) {
    if ( error.status === 401 ) {
      this.auth.logout();
      this.router.navigate( [ RoutingConstants.ADMIN_PAGE, RoutingConstants.ADMIN_LOGIN_PAGE ], {
        queryParams: {
          [ ErrorConstants.AUTHORIZATION_ERROR ]: true
        }
      } );
    }
    return throwError( error );
  }
}
