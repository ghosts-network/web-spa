import {Component, HostListener, OnInit} from '@angular/core';
import {AppConstants} from '@gn/constants';
import {OutgoingRequestsList} from '@gn/resolvers';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {RelationsService, User, UserInfo} from '@gn/api';
import {IDTokenClaims} from 'oidc-client';

@Component({
  selector: 'app-outgoing-requests',
  templateUrl: './outgoing-requests.page.html',
  styleUrls: ['./outgoing-requests.page.scss']
})
export class OutgoingRequestsPage implements OnInit {

  displayedColumns: string[] = ['info', 'actions'];

  list: OutgoingRequestsList | null;
  user: User;
  claims: IDTokenClaims;

  public showLoader = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relationsService: RelationsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.outgoingRequests;
      this.user = data.user;
      this.claims = data.claims;
    });
  }

  onTabChanged(event: MatTabChangeEvent): void {
    if (event.index === 0) {
      this.router.navigate([this.user.id, 'friends']);
    } else if (event.index === 1) {
      this.router.navigate([this.user.id, 'followers']);
    } else {
      this.router.navigate([this.user.id, 'incoming-requests']);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;

    if (currentScroll === document.documentElement.scrollHeight && this.list.hasMore) {
      this.showLoader = true;
      this.relationsService.relationsFriendsOutgoingRequestsGet(this.list.outgoingRequests.length, AppConstants.RelationsPerPage)
        .subscribe(resp => {
          this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
          this.list.outgoingRequests = [].concat(this.list.outgoingRequests, resp);
          this.showLoader = false;
        });
    }
  }

  public get editable(): boolean {
    return this.claims.sub === this.user.id;
  }

  cancelRequest(friend: UserInfo): void {
    this.relationsService.relationsOutgoingRequestDelete(friend.id)
      .subscribe(() => {
        this.relationsService.relationsFriendsOutgoingRequestsGet(0, AppConstants.RelationsPerPage)
          .subscribe(resp => {
            this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
            this.list.outgoingRequests = resp;
            this.showLoader = false;
          });
      });
  }
}
