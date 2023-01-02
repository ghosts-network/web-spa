import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutgoingRequestsRoutingModule } from './outgoing-requests-routing.module';
import { OutgoingRequestsPage } from './outgoing-requests.page';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from '../../modules/shared/components/avatar/avatar.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    OutgoingRequestsPage
  ],
  imports: [
    CommonModule,
    OutgoingRequestsRoutingModule,
    MatTabsModule,
    MatTableModule,
    AvatarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class OutgoingRequestsModule { }
