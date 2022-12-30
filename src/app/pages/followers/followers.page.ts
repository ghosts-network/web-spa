import { Component, OnInit } from '@angular/core';
import {AppConstants} from '@gn/constants';
import {FollowersList} from '@gn/resolvers';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {User} from "@gn/api";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss']
})
export class FollowersPage implements OnInit {

  displayedColumns: string[] = ['info', 'actions'];

  list: FollowersList | null;
  user: User;

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.followers;
      this.user = data.user;
    });
  }

  onTabChanged($event: MatTabChangeEvent): void {
    this.router.navigate([this.user.id, 'friends']);
  }
}
