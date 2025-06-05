import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/backend.srv';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  standalone: true,
})
export class ViewComponent  implements OnInit{
  products: Product[]=[]

  constructor(
    private ApiService: ApiService
  ) {}

ngOnInit(): void {
  this.ApiService.getData().subscribe(zhopa => {
    console.log(zhopa)
    this.products=zhopa
  })
}
}
