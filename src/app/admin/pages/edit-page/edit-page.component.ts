import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import FormConstants from 'src/constants/form-constants';
import { PostsService } from './../../../shared/services/posts.service';
import { FormIncludedComponent } from './../../shared/components/form-included/form-included.component';

@Component( {
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: [ './edit-page.component.scss' ]
} )
export class EditPageComponent extends FormIncludedComponent implements OnInit {

  constructor (
    private postsService: PostsService,
    private route: ActivatedRoute
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
        this.form = new FormGroup( {
          title: new FormControl( post.title, Validators.required ),
          text: new FormControl( post.text, Validators.required )
        } );
      } );
  }

  get titleField(): FormControl {
    return this.form.get( FormConstants.TITLE ) as FormControl;
  }

  get textField(): FormControl {
    return this.form.get( FormConstants.TEXT ) as FormControl;
  }
}
