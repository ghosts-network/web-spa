import {Component, HostListener, OnInit} from '@angular/core';
import {AppConstants} from '@gn/constants';
import {FollowersList} from '@gn/resolvers';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {RelationsService, User} from '@gn/api';
import {IDTokenClaims} from "oidc-client";

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss']
})
export class FollowersPage implements OnInit {

  displayedColumns: string[] = ['info', 'actions'];

  list: FollowersList | null;
  user: User;
  claims: IDTokenClaims;

  public showLoader = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relationsService: RelationsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.followers;
      this.user = data.user;
      this.claims = data.claims;
    });
  }

  onTabChanged(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this.router.navigate([this.user.id, 'friends']);
    } else if (event.index === 2) {
      this.router.navigate([this.user.id, 'outgoing-requests']);
    } else {
      this.router.navigate([this.user.id, 'incoming-requests']);
    }
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

  public get editable(): boolean {
    return this.claims.sub === this.user.id;
  }
}
