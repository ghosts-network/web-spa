import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from "./providers/guards/auth/auth-guard.service";
import {AuthCallbackComponent} from "./components/auth-callback/auth-callback.component";
import {AuthService} from "./providers/services/auth/auth.service";

const routes: Routes = [
  {
    path: 'auth-callback',
    component: AuthCallbackComponent
  },
  {
    path: 'style',
    loadChildren: () => import('./pages/style/style.module').then(m => m.StyleModule),
    canLoad: [AuthGuardService]
  },
  {
    path: ':id',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuardService]
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canLoad: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService, AuthService]
})
export class AppRoutingModule { }
