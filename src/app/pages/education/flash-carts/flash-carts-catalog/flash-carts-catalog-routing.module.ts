import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlashCartsCatalogPage } from './flash-carts-catalog.page';
import {FlashCardsSetsResolver} from './flash-cards-sets.resolver';

const routes: Routes = [
  {
    path: '',
    component: FlashCartsCatalogPage,
    resolve: { sets: FlashCardsSetsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashCartsCatalogRoutingModule { }
