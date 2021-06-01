import { MatToolbarModule } from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

import { HomePage } from './home.page';
import { NewsFormComponent } from './components/news-form/news-form.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from "@angular/material/dialog";
import {MatMenuModule} from '@angular/material/menu';
import {ReactionsService} from "./entities/reactions.enum";
import {MatDividerModule} from "@angular/material/divider";
import {NewsListModule} from "../../modules/shared/components/news-list/news-list.module";

@NgModule({
  declarations: [
    HomePage,
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
    NewsListModule
  ],
  providers: [
    ReactionsService
  ]
})
export class HomeModule { }
