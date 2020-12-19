import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemsComponent } from './items/items.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent
  },
  {
    path:'items',
    component: ItemsComponent,
    children: [
      {
        path: '',
        component: ItemListComponent
      },
      {
        path: 'profile',
        component: ItemEditComponent,
      },
      {
        path: 'profile/:id',
        component: ItemEditComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
