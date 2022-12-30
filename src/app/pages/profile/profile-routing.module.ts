import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePage } from './profile.page';
import {PublicationsResolver, UserResolver} from '@gn/resolvers';
import {RelationsResolver} from "../../providers/resolvers/relations-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      user: UserResolver,
      publications: PublicationsResolver,
      relations: RelationsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
