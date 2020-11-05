import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Post from 'src/app/shared/interfaces/post';
import FormConstants from 'src/constants/form-constants';

@Component( {
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: [ './create-page.component.scss' ]
} )
export class CreatePageComponent implements OnInit {

  public form: FormGroup;

  constructor () { }

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

    const Post: Post = {
      ...this.form.value,
      date: new Date()
    };
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
