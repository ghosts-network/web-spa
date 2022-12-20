import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './providers/guards/auth/auth-guard.service';
import {AuthCallbackComponent} from './components/auth-callback/auth-callback.component';
import {AuthService} from './providers/services/auth/auth.service';
import {UserResolver} from './providers/resolvers/user.resolver';

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/education/education.module').then(m => m.EducationModule),
    canLoad: [AuthGuardService],
    resolve: { user: UserResolver }
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuardService],
    resolve: { user: UserResolver }
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuardService],
    resolve: { user: UserResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule { }
