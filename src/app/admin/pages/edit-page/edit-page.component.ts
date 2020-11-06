import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import Post from 'src/app/shared/interfaces/post';
import AlertConstants from 'src/constants/alert-constants';
import FormConstants from 'src/constants/form-constants';
import { AlertService } from '../../shared/services/alert.service';
import { PostsService } from './../../../shared/services/posts.service';
import { FormIncludedComponent } from './../../shared/components/form-included/form-included.component';

@Component( {
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: [ './edit-page.component.scss' ]
} )
export class EditPageComponent extends FormIncludedComponent implements OnInit, OnDestroy {

  private currentPost: Post;
  private updateSub: Subscription;

  constructor (
    private postsService: PostsService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap( ( params: Params ) => {
          return this.postsService.getById( params[ 'id' ] );
        } )
      )
      .subscribe( post => {
        this.currentPost = post;
        this.form = new FormGroup( {
          title: new FormControl( post.title, Validators.required ),
          text: new FormControl( post.text, Validators.required )
        } );
      } );
  }

  submit() {
    if ( this.form.invalid ) {
      return;
    }

    this.isSubmitted = true;
    const updatedPost: Post = { ...this.currentPost, ...this.form.value };

    this.updateSub = this.postsService.update( updatedPost ).subscribe( () => {
      this.isSubmitted = false;
      this.alertService.danger( AlertConstants.SUCCESS_UPDATE_POST );
    } );
  }

  ngOnDestroy(): void {
    if ( this.updateSub ) {
      this.updateSub.unsubscribe();
    }
  }

  get titleField(): FormControl {
    return this.form.get( FormConstants.TITLE ) as FormControl;
  }

  get textField(): FormControl {
    return this.form.get( FormConstants.TEXT ) as FormControl;
  }
}
