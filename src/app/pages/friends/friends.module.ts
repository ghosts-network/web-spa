import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsPage } from './friends.page';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from '../../modules/shared/components/avatar/avatar.module';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    FriendsPage
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatTableModule,
    AvatarModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class FriendsModule { }
