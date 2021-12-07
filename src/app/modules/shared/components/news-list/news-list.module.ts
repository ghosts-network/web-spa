import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewsListComponent} from "./components/news-list/news-list.component";
import {NewsItemComponent} from "./components/news-item/news-item.component";
import {NewsFormCommentsComponent} from "./components/news-form-comments/news-form-comments.component";
import {ReactionsComponent} from "./components/news-reactions/news-reactions.component";
import {NewsCommentsComponent} from "./components/news-comments/news-comments.component";
import {PublicationActionsComponent} from "./components/publication-actions/publication-actions.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDividerModule} from "@angular/material/divider";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {ReactionsModule} from "../reactions/reactions.module";
import { NewsCommentItemComponent } from './components/news-comment-item/news-comment-item.component';


@NgModule({
  declarations: [
    NewsListComponent,
    NewsItemComponent,
    NewsFormCommentsComponent,
    ReactionsComponent,
    NewsCommentsComponent,
    NewsCommentItemComponent,
    PublicationActionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    ReactionsModule
  ],
  exports: [
    NewsListComponent,
    NewsItemComponent,
    NewsFormCommentsComponent,
    ReactionsComponent,
    NewsCommentsComponent,
    NewsCommentItemComponent,
    PublicationActionsComponent
  ]
})
export class NewsListModule { }
