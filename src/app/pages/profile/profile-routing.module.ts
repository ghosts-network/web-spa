import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilePage } from './profile.page';
import {PublicationsResolver, UserResolver, RelationsResolver} from '@gn/resolvers';

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
