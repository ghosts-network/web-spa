import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashCartsCatalogRoutingModule } from './flash-carts-catalog-routing.module';
import { FlashCartsCatalogPage } from './flash-carts-catalog.page';

@NgModule({
  declarations: [
    FlashCartsCatalogPage
  ],
  imports: [
    CommonModule,
    FlashCartsCatalogRoutingModule
  ]
})
export class FlashCartsCatalogModule { }
