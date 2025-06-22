import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { Urls } from '../shared/enums/urls.enum';

export const routes: Routes = [
  { path: Urls.View, component: ViewComponent },
  { path: `${Urls.Edit}/:id`, component: EditComponent },
  { path: Urls.Create, component: EditComponent },
  { path: '**', redirectTo: Urls.View },
];
