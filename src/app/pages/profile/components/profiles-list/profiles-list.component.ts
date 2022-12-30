import { Component, Input } from '@angular/core';
import { UserInfo } from '@gn/api';
import {AppConstants} from '@gn/constants';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent {

  @Input()
  public label: string;

  @Input()
  public users: UserInfo[];
}
