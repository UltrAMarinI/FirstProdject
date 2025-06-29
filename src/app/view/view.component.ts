import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/service/backend.srv';
import { Product } from '../../shared/interfaces/product.interface';
import { RouterModule } from '@angular/router';
import { OvalMenuComponent } from '../oval-menu/oval-menu.component';
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
  List: List[] = [
    { value: '1', title: 'один' },
    { value: '2', title: 'два' },
    { value: '3', title: 'три' },
    { value: '4', title: 'четыре' },
    { value: '5', title: 'пять' },
    { value: '6', title: 'шесть' },

  ];
  titlePr: string = 'Продукты';
  filterArray: Product[] = [];

  constructor(private ApiService: ApiService) {}

  ngOnInit(): void {
    this.upDate();
  }

  upDate() {
    this.ApiService.getData().subscribe((a) => {
      this.products = a;
      this.filterArray = a;
    });
  }

  deleteProduct(id: number | undefined): void {
    if (!id) return;
    this.ApiService.deleteData(id).subscribe(() => {
      this.upDate();
    });
  }

  output($event: List) {
    console.log($event);
    this.filterSel($event);
  }

  filterSel(sel: List) {
    if (!sel) return;
    else {
      this.filterArray = this.products.filter((a) => {
        if (a.id) {
          const r = Number(sel.value) <= a.id;
          return r;
        } else return false;
      });
    }
  }
}
