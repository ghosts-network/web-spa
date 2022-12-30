import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowersRoutingModule } from './followers-routing.module';
import { FollowersPage } from './followers.page';
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {AvatarModule} from "../../modules/shared/components/avatar/avatar.module";


@NgModule({
  declarations: [
    FollowersPage
  ],
  imports: [
    CommonModule,
    FollowersRoutingModule,
    MatTabsModule,
    MatTableModule,
    AvatarModule
  ]
})
export class FollowersModule { }
