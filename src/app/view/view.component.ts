import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/backend.srv';
import { Product } from '../../shared/interfaces/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view',
  imports: [RouterModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  standalone: true,
})
export class ViewComponent implements OnInit {
  products: Product[] = [];

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.upDate();
  }

  upDate() {
    this.ApiService.getData().subscribe((a) => {
      this.products = a;
    });
  }

  deleteProduct(id: number | undefined): void {
    if (!id) return;
    this.ApiService.deleteData(id).subscribe(() => {
      this.upDate();
    });
  }
}
