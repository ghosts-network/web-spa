import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IncomingRequestsPage} from './incoming-requests.page';
import {IncomingRequestsResolver, UserResolver} from '@gn/resolvers';

const routes: Routes = [
  {
    path: '',
    component: IncomingRequestsPage,
    resolve: {
      user: UserResolver,
      incomingRequests: IncomingRequestsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomingRequestsRoutingModule { }
