import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsFormComponent} from './news-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {LinkMetaModule} from '../link-meta/link-meta.module';
import {MatButtonModule} from '@angular/material/button';
import {HomeRoutingModule} from "../../../../pages/home/home-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {NewsListModule} from "../news-list/news-list.module";

@NgModule({
  declarations: [NewsFormComponent],
  exports: [
    NewsFormComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatMenuModule,
    NewsListModule,
    LinkMetaModule
  ]
})
export class NewsFormModule { }
