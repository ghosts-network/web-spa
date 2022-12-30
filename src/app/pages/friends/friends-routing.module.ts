import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FriendsPage} from './friends.page';
import {FriendsResolver, UserResolver} from '@gn/resolvers';

const routes: Routes = [
  {
    path: '',
    component: FriendsPage,
    resolve: {
      user: UserResolver,
      friends: FriendsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendsRoutingModule { }
