import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlashCartsDetailsRoutingModule } from './flash-carts-details-routing.module';
import { FlashCartsDetailsPage } from './flash-carts-details.page';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    FlashCartsDetailsPage
  ],
  imports: [
    CommonModule,
    FlashCartsDetailsRoutingModule,
    ReactiveFormsModule
  ]
})
export class FlashCartsDetailsModule { }
