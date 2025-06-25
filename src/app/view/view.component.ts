import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/backend.srv';
import { Product } from '../../shared/interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { OvalMenuComponent } from "../oval-menu/oval-menu.component";
import { List } from '../../shared/interfaces/ovalMenu.interface';

@Component({
  selector: 'app-view',
  imports: [RouterModule, OvalMenuComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  standalone: true,
})
export class ViewComponent implements OnInit {
  products: Product[] = [];
  List: List[]=[
    {value: '44', title: 'машина'},
    {value: '55', title: 'дом'},
    {value: '66', title: 'собака'}
  ]

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

  output($event: List){
    console.log($event)
  }
}
