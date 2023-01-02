import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomingRequestsRoutingModule } from './incoming-requests-routing.module';
import { IncomingRequestsPage } from './incoming-requests.page';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {AvatarModule} from '../../modules/shared/components/avatar/avatar.module';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    IncomingRequestsPage
  ],
  imports: [
    CommonModule,
    IncomingRequestsRoutingModule,
    MatTabsModule,
    MatTableModule,
    AvatarModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class IncomingRequestsModule { }
