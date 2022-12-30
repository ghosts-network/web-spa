import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FriendsRoutingModule } from './friends-routing.module';
import { FriendsPage } from './friends.page';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from '../../modules/shared/components/avatar/avatar.module';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    FriendsPage
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    MatTableModule,
    AvatarModule,
    MatTabsModule
  ]
})
export class FriendsModule { }
