import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {NewsFeedPublication, NewsFeedService, User, UsersService} from '@gn/api';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {HttpEventType} from '@angular/common/http';
import {PublicationsList} from '@gn/resolvers';
import {AppConstants} from '@gn/constants';
import {NewPublication} from '../../modules/shared/components/news-form/news-form.component';
import {RelationsService, RelationsSummary} from '../../providers/services/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput', {static: false}) fileInput: ElementRef;

  public AppConstants = AppConstants;

  public news: PublicationsList | null;
  public relations: RelationsSummary | null;
  public user: User;

  public showLoader = false;

  public currentUserId: string;
  private maxScroll: number;

  constructor(private usersService: UsersService,
              private newsFeedService: NewsFeedService,
              private relationsService: RelationsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.news = data.publications;
      this.showLoader = false;

      this.currentUserId = data.claims.sub;

      this.user = data.user;
      this.relations = data.relations;
    });
  }

  public onDeleted(publication: NewsFeedPublication): void {
    this.newsFeedService.newsFeedPublicationIdDelete(publication.id).subscribe(_ => {
      this.news.publications = this.news.publications.filter(pub => pub.id !== publication.id);
    });
  }

  public onEdited(publication: NewsFeedPublication): void {
    this.newsFeedService.newsFeedPublicationIdPut(publication.id, { content : publication.content }).subscribe(_ => {

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

  public get editable(): boolean {
    return this.currentUserId === this.user.id;
  }

  addFriend(): void {
    this.relationsService.sendFriendRequest(this.user.id)
      .subscribe(() => {
        this.relationsService.getSummary(this.user.id)
          .subscribe(response => {
            this.relations = response;
          });
      });
  }

  cancelRequest(): void {
    this.relationsService.cancelOutgoingRequest(this.user.id)
      .subscribe(() => {
        this.relationsService.getSummary(this.user.id)
          .subscribe(response => {
            this.relations = response;
          });
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
