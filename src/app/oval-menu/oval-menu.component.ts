import { Component, EventEmitter, Input, Output } from '@angular/core';
import { List } from '../../shared/interfaces/ovalMenu.interface';
import { NgClass } from '@angular/common';
import {HostListener} from '@angular/core';

@Component({
  selector: 'app-oval-menu',
  imports: [NgClass],
  templateUrl: './oval-menu.component.html',
  styleUrl: './oval-menu.component.scss',
})
export class OvalMenuComponent {
  opened = false;
  @Input() title: string | undefined;
  @Input()
  array: List[] = [];
  @Output() selectedVal = new EventEmitter<List>();
  selected!: List;

  openMenu(event: Event) {
    event.stopPropagation();
    this.opened = !this.opened;
  }

  select(data: List) {
    this.selected = data;
    this.opened = false;
    this.selectedVal.emit(data);
  }

  @HostListener('document: click')
  closeMenu(){
    this.opened=false;
  }
}
