import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'flash-cards',
    loadChildren: () => import('./flash-carts/flash-carts-catalog/flash-carts-catalog.module')
      .then(m => m.FlashCartsCatalogModule),
  },
  {
    path: 'flash-cards/:id',
    loadChildren: () => import('./flash-carts/flash-carts-details/flash-carts-details.module')
      .then(m => m.FlashCartsDetailsModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EducationRoutingModule { }
