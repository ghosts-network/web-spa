import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FriendsList} from '@gn/resolvers';
import {AppConstants} from '@gn/constants';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {User} from "@gn/api";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss']
})
export class FriendsPage implements OnInit {
  displayedColumns: string[] = ['info', 'actions'];

  list: FriendsList | null;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.friends;
      this.user = data.user;
    });
  }

  onTabChanged($event: MatTabChangeEvent): void {
    this.router.navigate([this.user.id, 'followers']);
  }
}
