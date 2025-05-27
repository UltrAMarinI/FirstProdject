import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urls } from '../../shared/enums/urls.enum';
import { FormsModule } from '@angular/forms';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-edit',
  imports: [FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
})
export class EditComponent implements OnInit {
  isEdit = true;

  product: Product = {
    name: '...',
    price: 0,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let url = this.route.snapshot.url.join('/');
    this.isEdit = url === Urls.Edit ? true : false;
    console.log(this.isEdit);
  }

  editProduct() {
    console.log('редактирую', this.product.name, this.product.price);
  }

  createProduct() {
    console.log('создаю', this.product.name, this.product.price);
  }
}
