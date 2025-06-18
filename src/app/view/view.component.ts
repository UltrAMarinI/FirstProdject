import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/backend.srv';
import { Product } from '../../shared/interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { Urls } from '../../shared/enums/urls.enum';
import id from '@angular/common/locales/id';

@Component({
  selector: 'app-view',
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  standalone: true,
})
export class ViewComponent implements OnInit {
  products: Product[] = [];
Urls: any;
id: any|string;

  constructor(private ApiService: ApiService) {}

  upDate() {
    this.ApiService.getData().subscribe((a) => {
      console.log(a);
      this.products = a;
    });
  }

  ngOnInit(): void {
    this.upDate();
  }

  deleteProduct(id: number | undefined): void {
    if (!id) return;
    this.ApiService.deleteData(id).subscribe(()=>{
        this.upDate();
    });
  }
}
