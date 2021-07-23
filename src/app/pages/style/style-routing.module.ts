import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StylePage } from './style.page';
import {ReactionsPgComponent} from "./reactions-pg/reactions-pg.component";

const routes: Routes = [
  {
    path: '',
    component: StylePage
  },
  {
    path: 'reactions',
    component: ReactionsPgComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleRoutingModule { }
