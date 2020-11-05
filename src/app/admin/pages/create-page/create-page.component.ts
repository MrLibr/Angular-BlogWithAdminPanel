import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Post from 'src/app/shared/interfaces/post';
import FormConstants from 'src/constants/form-constants';
import { PostsService } from './../../../shared/services/posts.service';


@Component( {
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: [ './create-page.component.scss' ]
} )
export class CreatePageComponent implements OnInit {

  public form: FormGroup;

  constructor ( private posts: PostsService ) { }

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
    } );
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
}
