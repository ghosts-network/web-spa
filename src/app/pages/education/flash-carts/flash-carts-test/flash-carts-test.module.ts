import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashCartsTestRoutingModule } from './flash-carts-test-routing.module';
import { FlashCartsTestPage } from './flash-carts-test.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FlashCartsTestPage
  ],
  imports: [
    CommonModule,
    FlashCartsTestRoutingModule,
    ReactiveFormsModule
  ]
})
export class FlashCartsTestModule { }
