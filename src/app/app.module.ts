import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiModule, Configuration} from './modules/gateway-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';
import {TokenInterceptor} from './providers/interceptors/token.interceptor';
import {SharedModule} from './modules/shared/shared.module';
declare let config: any;

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiModule.forRoot(() => new Configuration({
      basePath: config.basePath
    })),
    BrowserAnimationsModule,
    SharedModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }
