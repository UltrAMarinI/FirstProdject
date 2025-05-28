import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class editServise {
  constructor(private formBuilder: FormBuilder) {}

  editForm(): FormGroup {
    return this.formBuilder.group({
      nameProduct: ['', Validators.required],
      priceProduct: ['', Validators.required],
    });
  }

  clearForm(form: FormGroup) {
    form.reset();
  }
}
