import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component( {
  selector: 'app-form-included',
  templateUrl: './form-included.component.html',
  styleUrls: [ './form-included.component.scss' ]
} )
export class FormIncludedComponent implements OnInit {

  public form: FormGroup;

  constructor () { }

  ngOnInit(): void { }

  submit() { }

  validateField( field: FormControl ): boolean {
    return field.invalid && field.touched;
  }
}
