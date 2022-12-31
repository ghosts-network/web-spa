import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FriendsList} from '@gn/resolvers';
import {AppConstants} from '@gn/constants';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {RelationsService, User} from '@gn/api';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss']
})
export class FriendsPage implements OnInit {
  displayedColumns: string[] = ['info', 'actions'];

  list: FriendsList | null;
  user: User;

  public showLoader = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relationsService: RelationsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.friends;
      this.user = data.user;
    });
  }

  onTabChanged(_: MatTabChangeEvent): void {
    this.router.navigate([this.user.id, 'followers']);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;

    if (currentScroll === document.documentElement.scrollHeight && this.list.hasMore) {
      this.showLoader = true;
      this.relationsService.relationsUserIdFriendsGet(this.user.id, this.list.friends.length, AppConstants.RelationsPerPage)
        .subscribe(resp => {
          this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
          this.list.friends = [].concat(this.list.friends, resp);
          this.showLoader = false;
        });
    }
  }
}
