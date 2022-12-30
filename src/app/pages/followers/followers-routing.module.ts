import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FollowersPage} from './followers.page';
import {FollowersResolver, UserResolver} from '@gn/resolvers';

const routes: Routes = [
  {
    path: '',
    component: FollowersPage,
    resolve: {
      user: UserResolver,
      followers: FollowersResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowersRoutingModule { }
