import {Component, HostListener, OnInit} from '@angular/core';
import {NewsFeedPublication, NewsFeedService, User, UserInfo, UsersService, RelationsService} from '../../modules/gateway-api';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ProfileFormComponent} from './components/profile-form/profile-form.component';
import {AuthService} from '../../providers/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  public itemsPerRequest = 20;
  public bioIsOpened: boolean;

  public news: NewsFeedPublication[] = [];
  public outgoingRequests: UserInfo[];
  public incomingRequests: UserInfo[];
  public friends: UserInfo[];
  public followers: UserInfo[];

  public user: User;
  public hasMore: boolean;
  public isFriend: boolean;
  public isMySubscription: boolean;

  public showLoader = false;

  private cursor: string;
  public currentUserId: string;
  private maxScroll: number;
  private currentScroll: number;

  constructor(private usersService: UsersService,
              private newsFeedService: NewsFeedService,
              private relationsService: RelationsService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fetchUser(params.id);
      this.cursor = null;
      this.news = [];
      this.loadPublications(params.id);
      this.loadFriends(params.id);
      this.loadFollowers(params.id);
      this.loadOutgoingRequests();
      this.loadIncomingRequests();
    });

    this.authService.getUser().subscribe(user => {
      this.currentUserId = user.profile.sub;
    });
  }

  private fetchUser(id: string): void {
    this.usersService.usersUserIdGet(id).subscribe(user => {
      this.user = user;
    });
  }

  public setupInfo(): void {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      data: this.user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.usersService.usersUserIdPut(this.user.id, {
          gender: result.gender
        }).subscribe(r => {
          this.fetchUser(this.user.id);
        });
      }
    });
  }

  public onDeleted(publication: NewsFeedPublication): void {
    this.newsFeedService.newsFeedPublicationIdDelete(publication.id).subscribe(resp => {
      this.news = this.news.filter(pub => pub.id !== publication.id);
    });
  }

  public onEdited(publication: NewsFeedPublication): void {
    this.newsFeedService.newsFeedPublicationIdPut(publication.id, { content : publication.content }).subscribe(resp => {

    });
  }

  public loadPublications(id: string): void {
    this.showLoader = true;
    this.newsFeedService.newsFeedUsersUserIdGet(id, null,  this.itemsPerRequest, this.cursor,  'response').subscribe(resp => {
      this.cursor = resp.headers.get('x-cursor');
      this.hasMore = resp.body.length === this.itemsPerRequest;
      this.news = [].concat(this.news, resp.body);
      this.showLoader = false;
    });
  }

  public loadOutgoingRequests(): void {
    this.relationsService.relationsFriendsOutgoingRequestsGet(0, 20).subscribe(resp => {
      this.outgoingRequests = resp;
    });
  }

  public loadIncomingRequests(): void {
    this.relationsService.relationsFriendsIncomingRequestsGet(0, 20).subscribe(resp => {
      this.incomingRequests = resp;
    });
  }

  public loadFriends(id: string): void {
    this.relationsService.relationsUserIdFriendsGet(id, 0, 20).subscribe(resp => {
      this.friends = resp;
      this.isFriend = this.friends.some(f => f.id === this.currentUserId);
    });
  }

  public loadFollowers(id: string): void {
    this.relationsService.relationsUserIdFollowersGet(id, 0, 20).subscribe(resp => {
      this.followers = resp;
      this.isMySubscription = this.followers.some(f => f.id === this.currentUserId);
    });
  }

  public get editable(): boolean {
    return this.currentUserId === this.user.id;
  }

  addFriend(): void {
    this.relationsService.relationsFriendsToUserPost(this.user.id)
      .subscribe(resp => {
        this.loadFollowers(this.user.id);
      });
  }

  approveFriendRequest(user: UserInfo): void {
    this.relationsService.relationsFriendsRequesterApprovePut(user.id)
      .subscribe(resp => {
        this.loadIncomingRequests();
        this.loadFriends(this.user.id);
        this.loadFollowers(this.user.id);
        this.incomingRequests = this.incomingRequests.filter(r => r.id !== user.id);
        this.followers = this.followers.filter(f => f.id !== user.id);
        this.friends.push(user);
      });
  }

  declineFriendRequest(user: UserInfo): void {
    this.relationsService.relationsFriendsRequesterDeclinePost(user.id)
      .subscribe(resp => {
        this.incomingRequests = this.incomingRequests.filter(r => r.id !== user.id);
        this.loadIncomingRequests();
      });
  }

  removeFriend(user: UserInfo): void {
    this.relationsService.relationsFriendsFriendDelete(user.id).subscribe(resp => {
      this.friends = this.friends.filter(f => f.id !== user.id);
      this.followers.push(user);
    });
  }

  removeOutgoingRequest(user: UserInfo): void {
    this.relationsService.relationsOutgoingRequestDelete(user.id).subscribe(resp => {
      this.outgoingRequests = this.outgoingRequests.filter(f => f.id !== user.id);
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.maxScroll = document.documentElement.scrollHeight;

    if (this.currentScroll === this.maxScroll && this.hasMore) {
      this.loadPublications(this.user.id);
    }
  }
}
