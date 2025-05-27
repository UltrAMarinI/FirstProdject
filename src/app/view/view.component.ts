import { Component } from '@angular/core';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  standalone: true,
})
export class ViewComponent {
  x = 'i am beautifull';
  
  changeX() {
    this.x = 'i am super star!';
  }
}
