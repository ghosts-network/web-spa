import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './providers/guards/auth/auth-guard.service';
import {AuthCallbackComponent} from './components/auth-callback/auth-callback.component';
import {AuthService} from './providers/services/auth/auth.service';
import {AuthProfileResolver} from '@gn/resolvers';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/education/education.module').then(m => m.EducationModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  },
  {
    path: ':id/followers',
    loadChildren: () => import('./pages/followers/followers.module').then(m => m.FollowersModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  },
  {
    path: ':id/friends',
    loadChildren: () => import('./pages/friends/friends.module').then(m => m.FriendsModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  },
  {
    path: ':id/outgoing-requests',
    loadChildren: () => import('./pages/outgoing-requests/outgoing-requests.module').then(m => m.OutgoingRequestsModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  },
  {
    path: ':id/incoming-requests',
    loadChildren: () => import('./pages/incoming-requests/incoming-requests.module').then(m => m.IncomingRequestsModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuardService],
    resolve: { claims: AuthProfileResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule { }
