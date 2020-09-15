import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import {PublicationService} from "./publications.service";
import {HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./shared/gateway-api";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApiModule
  ],
  providers: [PublicationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
