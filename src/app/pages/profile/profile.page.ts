import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NewsFeedPublication, NewsFeedService, User, UsersService, RelationsService} from '@gn/api';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ProfileFormComponent} from './components/profile-form/profile-form.component';
import {map} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {PublicationsList, Relations} from '@gn/resolvers';
import {AppConstants} from '@gn/constants';
import {NewPublication} from '../../modules/shared/components/news-form/news-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  public AppConstants = AppConstants;

  public news: PublicationsList | null;
  public relations: Relations | null;

  public user: User;
  public isFriend: boolean;
  public isMySubscription: boolean;

  public showLoader = false;

  public currentUserId: string;
  private maxScroll: number;

  constructor(private usersService: UsersService,
              private newsFeedService: NewsFeedService,
              private relationsService: RelationsService,
              private route: ActivatedRoute,
              private dialog: MatDialog) { }


  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.news = data.publications;
      this.showLoader = false;

      this.currentUserId = data.claims.sub;

      this.user = data.user;
      this.relations = data.relations;
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
      this.news.publications = this.news.publications.filter(pub => pub.id !== publication.id);
    });
  }

  public onEdited(publication: NewsFeedPublication): void {
    this.newsFeedService.newsFeedPublicationIdPut(publication.id, { content : publication.content }).subscribe(resp => {

    });
  }

  public reloadPublications(id: string): void {
    this.news.publications = [];
    this.news.cursor = null;
    this.loadPublications(id);
  }

  public loadPublications(id: string): void {
    this.showLoader = true;
    this.newsFeedService.newsFeedUsersUserIdGet(id, null, AppConstants.NewsPerPage, this.news.cursor, 'response')
      .subscribe(resp => {
        this.news = {
          cursor: resp.headers.get(AppConstants.Headers.Cursor),
          hasMore: resp.body.length === AppConstants.NewsPerPage,
          publications: [].concat(this.news.publications, resp.body)
        };

        this.showLoader = false;
      });
  }

  public loadFollowers(id: string): void {
    this.relationsService.relationsUserIdFollowersGet(id, 0, 20).subscribe(resp => {
      this.relations.followers = resp;
      this.isMySubscription = this.relations.followers.some(f => f.id === this.currentUserId);
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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.maxScroll = document.documentElement.scrollHeight;

    if (currentScroll === this.maxScroll && this.news.hasMore) {
      this.loadPublications(this.user.id);
    }
  }

  public onFileSelected(): void {
    const formData = new FormData();
    formData.append('file', this.fileInput.nativeElement.files[0]);
    this.fileInput.nativeElement.value = '';

    this.usersService.uploadAvatar(this.user.id, formData)
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              console.log(Math.round(event.loaded * 100 / event.total));
              break;
            case HttpEventType.Response:

              return event;
          }
        }))
      .subscribe();
  }

  public OnPublishClicked(model: NewPublication): void {
    this.newsFeedService.newsFeedPost(model).subscribe(_ => {
      this.reloadPublications(this.user.id);
    });
  }
}
