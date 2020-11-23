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

import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { HomePage } from './home.page';
import { NewsFormComponent } from './components/news-form/news-form.component';
import { NewsFormCommentsComponent } from './components/news-form-comments/news-form-comments.component';
import { ReactionsComponent } from './components/news-reactions/news-reactions.component';

@NgModule({
  declarations: [HomePage, NewsFormComponent, NewsListComponent, NewsItemComponent, NewsFormCommentsComponent, ReactionsComponent],
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
    MatCardModule
  ]
})
export class HomeModule { }
