import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkMetaComponent } from './link-meta.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    LinkMetaComponent
  ],
  exports: [
    LinkMetaComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class LinkMetaModule { }
