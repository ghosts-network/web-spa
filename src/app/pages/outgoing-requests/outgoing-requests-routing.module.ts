import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OutgoingRequestsPage} from './outgoing-requests.page';
import {UserResolver, OutgoingRequestsResolver} from '@gn/resolvers';

const routes: Routes = [
  {
    path: '',
    component: OutgoingRequestsPage,
    resolve: {
      user: UserResolver,
      outgoingRequests: OutgoingRequestsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutgoingRequestsRoutingModule { }
