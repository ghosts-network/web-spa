import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionsComponent } from './reactions.component';

@NgModule({
  declarations: [ReactionsComponent],
  exports: [
    ReactionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ReactionsModule { }
