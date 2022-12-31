import {Component, HostListener, OnInit} from '@angular/core';
import {AppConstants} from '@gn/constants';
import {FollowersList} from '@gn/resolvers';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {RelationsService, User} from '@gn/api';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss']
})
export class FollowersPage implements OnInit {

  displayedColumns: string[] = ['info', 'actions'];

  list: FollowersList | null;
  user: User;

  public showLoader = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relationsService: RelationsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.followers;
      this.user = data.user;
    });
  }

  onTabChanged(_: MatTabChangeEvent): void {
    this.router.navigate([this.user.id, 'friends']);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;

    if (currentScroll === document.documentElement.scrollHeight && this.list.hasMore) {
      this.showLoader = true;
      this.relationsService.relationsUserIdFriendsGet(this.user.id, this.list.followers.length, AppConstants.RelationsPerPage)
        .subscribe(resp => {
          this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
          this.list.followers = [].concat(this.list.followers, resp);
          this.showLoader = false;
        });
    }
  }
}
