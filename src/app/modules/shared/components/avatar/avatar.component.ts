import {Component, Input, OnInit} from '@angular/core';
import {AppConstants} from '@gn/constants';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input()
  public image: string | null;
  @Input()
  public size = 'md';

  public DefaultAvatar = AppConstants.DefaultAvatar;

  constructor() { }

  ngOnInit(): void {
  }

}
