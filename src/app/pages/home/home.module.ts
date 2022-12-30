import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ReactionsService} from './entities/reactions.enum';
import {NewsListModule} from '../../modules/shared/components/news-list/news-list.module';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatProgressSpinnerModule,
    NewsListModule
  ],
  providers: [
    ReactionsService
  ]
})
export class HomeModule { }
