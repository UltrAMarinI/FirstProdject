import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../shared/enums/urls.enum';
import {
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../shared/interfaces/product.interface';


@Component({
  selector: 'app-edit',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
})
export class EditComponent implements OnInit {
  isEdit = true;

  product: Product = {
    name: '',
    price: 0,
  };

  constructor(private route: ActivatedRoute) {}

  myForm: FormGroup = new FormGroup({
    nameProduct: new FormControl('', Validators.required),
    priceProduct: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    let url = this.route.snapshot.url.join('/');
    this.isEdit = url === Urls.Edit ? true : false;
    console.log(this.isEdit);
  }

  editProduct() {
    console.log('редактирую', this.myForm.get('nameProduct')?.value, this.myForm.get('priceProduct')?.value);
  }

  createProduct() {
    console.log('создаю', this.myForm.get('nameProduct')?.value, this.myForm.get('priceProduct')?.value);
  }

  submit() {
    console.log(this.myForm);
  }

  clearForm() {
    this.myForm.reset();
  }
}
