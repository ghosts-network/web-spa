import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { RelationsService } from 'src/app/modules/gateway-api';
import { UserInfo } from 'src/app/modules/gateway-api/model/userInfo';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  public panelOpenState: boolean;
  @Input()
  public label: string;
  @Input()
  public users: UserInfo[];
  @Output()
  public listChanged = new EventEmitter<UserInfo[]>();

  constructor() { }

  ngOnInit(): void { }
}
