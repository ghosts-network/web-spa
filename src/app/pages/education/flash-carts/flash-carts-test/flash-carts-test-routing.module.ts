import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlashCartsTestPage} from './flash-carts-test.page';
import {FlashCardsSetResolver} from './flash-cards-set.resolver';

const routes: Routes = [
  {
    path: '',
    component: FlashCartsTestPage,
    resolve: { set: FlashCardsSetResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashCartsTestRoutingModule { }
