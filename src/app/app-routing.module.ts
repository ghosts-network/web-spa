import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './providers/guards/auth/auth-guard.service';
import {AuthCallbackComponent} from './components/auth-callback/auth-callback.component';
import {AuthService} from './providers/services/auth/auth.service';
import {AuthProfileResolver} from './providers/resolvers/auth-profile-resolver.service';

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
