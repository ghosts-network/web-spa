import {Component, HostListener, OnInit} from '@angular/core';
import {AppConstants} from '@gn/constants';
import {IncomingRequestsList} from '@gn/resolvers';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {RelationsService, User} from '@gn/api';
import {IDTokenClaims} from 'oidc-client';

@Component({
  selector: 'app-outgoing-requests',
  templateUrl: './incoming-requests.page.html',
  styleUrls: ['./incoming-requests.page.scss']
})
export class IncomingRequestsPage implements OnInit {

  displayedColumns: string[] = ['info', 'actions'];

  list: IncomingRequestsList | null;
  user: User;
  claims: IDTokenClaims;

  public showLoader = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private relationsService: RelationsService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.list = data.incomingRequests;
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
      this.router.navigate([this.user.id, 'outgoing-requests']);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;

    if (currentScroll === document.documentElement.scrollHeight && this.list.hasMore) {
      this.showLoader = true;
      this.relationsService.relationsFriendsIncomingRequestsGet(this.list.incomingRequests.length, AppConstants.RelationsPerPage)
        .subscribe(resp => {
          this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
          this.list.incomingRequests = [].concat(this.list.incomingRequests, resp);
          this.showLoader = false;
        });
    }
  }

  public get editable(): boolean {
    return this.claims.sub === this.user.id;
  }

  declineRequest(friend): void {
    this.relationsService.relationsFriendsRequesterDeclinePost(friend.id)
      .subscribe(() => {
        this.relationsService.relationsFriendsIncomingRequestsGet(0, AppConstants.RelationsPerPage)
          .subscribe(resp => {
            this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
            this.list.incomingRequests = resp;
            this.showLoader = false;
          });
      });
  }

  approveRequest(friend): void {
    this.relationsService.relationsFriendsRequesterApprovePut(friend.id)
      .subscribe(() => {
        this.relationsService.relationsFriendsIncomingRequestsGet(0, AppConstants.RelationsPerPage)
          .subscribe(resp => {
            this.list.hasMore = resp.length === AppConstants.RelationsPerPage;
            this.list.incomingRequests = resp;
            this.showLoader = false;
          });
      });
  }
}
