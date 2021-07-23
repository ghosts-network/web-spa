import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylePage } from './style.page';
import {StyleRoutingModule} from "./style-routing.module";
import { ReactionsPgComponent } from './reactions-pg/reactions-pg.component';
import {NewsListModule} from "../../modules/shared/components/news-list/news-list.module";
import {ReactionsModule} from "../../modules/shared/components/reactions/reactions.module";

@NgModule({
  declarations: [StylePage, ReactionsPgComponent],
  imports: [
    CommonModule,
    StyleRoutingModule,
    NewsListModule,
    ReactionsModule
  ]
})
export class StyleModule { }
