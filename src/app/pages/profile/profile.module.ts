import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ProfilePage} from "./profile.page";
import {ProfileRoutingModule} from "./profile-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    ProfilePage,
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class ProfileModule { }
