import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlashCartsDetailsPage} from './flash-carts-details.page';
import {FlashCardsSetResolver} from './flash-cards-set.resolver';

const routes: Routes = [
  {
    path: '',
    component: FlashCartsDetailsPage,
    resolve: { set: FlashCardsSetResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlashCartsDetailsRoutingModule { }
