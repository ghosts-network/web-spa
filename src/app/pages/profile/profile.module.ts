import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';
import {ProfileRoutingModule} from './profile-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {NewsListModule} from '../../modules/shared/components/news-list/news-list.module';
import {MatExpansionModule} from '@angular/material/expansion';
import {ReactionsService} from '../home/entities/reactions.enum';
import { ProfilesListComponent } from './components/profiles-list/profiles-list.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NewsFormModule} from '../../modules/shared/components/news-form/news-form.module';
import {AvatarModule} from "../../modules/shared/components/avatar/avatar.module";

@NgModule({
    declarations: [
        ProfilePage,
        ProfileFormComponent,
        ProfilesListComponent,
        ProfilesListComponent
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
    MatCardModule,
    MatExpansionModule,
    NewsListModule,
    MatProgressSpinnerModule,
    NewsFormModule,
    AvatarModule
  ],
  providers: [
    ReactionsService
  ]
})
export class ProfileModule { }
