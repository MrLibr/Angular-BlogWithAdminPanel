import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Post from 'src/app/shared/interfaces/post';
import AlertConstants from 'src/constants/alert-constants';
import FormConstants from 'src/constants/form-constants';
import { PostsService } from './../../../shared/services/posts.service';
import { FormIncludedComponent } from './../../shared/components/form-included/form-included.component';
import { AlertService } from './../../shared/services/alert.service';


@Component( {
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: [ './create-page.component.scss' ]
} )
export class CreatePageComponent extends FormIncludedComponent implements OnInit, OnDestroy {

  private createSub: Subscription;

  constructor (
    private postsService: PostsService,
    private alertService: AlertService
  ) {
    super();
  }

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

    this.isSubmitted = true;

    const post: Post = {
      ...this.form.value,
      date: new Date()
    };

    this.createSub = this.postsService.create( post ).subscribe( () => {
      this.isSubmitted = false;
      this.form.reset();
      this.alertService.success( AlertConstants.SUCCESS_CREATE_POST );
    } );
  }

  ngOnDestroy(): void {
    if ( this.createSub ) {
      this.createSub.unsubscribe();
    }
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
}
