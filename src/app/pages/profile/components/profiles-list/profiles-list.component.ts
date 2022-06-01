import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfo } from 'src/app/modules/gateway-api/model/userInfo';
import { AuthService } from 'src/app/providers/services/auth/auth.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss']
})
export class ProfilesListComponent implements OnInit {
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  public panelOpenState: boolean;
  public currentUserId: string;
  @Input()
  public label: string;
  @Input()
  public approving = false;
  @Input()
  public removing = false;
  @Input()
  public users: UserInfo[];

  @Output()
  public listChanged = new EventEmitter<UserInfo[]>();
  @Output()
  public approved = new EventEmitter<UserInfo>();
  @Output()
  public declined = new EventEmitter<UserInfo>();
  @Output()
  public removed = new EventEmitter<UserInfo>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.currentUserId = user.sub;
      });
  }

  public onApprove(user: UserInfo): void {
    this.approved.emit(user);
  }

  public onDecline(user: UserInfo): void {
    this.declined.emit(user);
  }

  public onRemove(user: UserInfo): void {
    this.removed.emit(user);
  }
}
