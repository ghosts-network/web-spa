import { Component, OnInit, HostListener } from '@angular/core';
import {NewsFeedPublication, NewsFeedService} from '../../modules/gateway-api';
import {AuthService} from '../../providers/services/auth/auth.service';
import {Profile} from 'oidc-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public itemsPerRequest = 20;
  public news: NewsFeedPublication[] = [];
  public user: Profile;
  public cursor: string;
  public hasMore: boolean;
  public showLoader = false;
  private maxScroll: number;
  private currentScroll: number;

  constructor(private newsFeedService: NewsFeedService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.loadPublications();
    this.authService.getUser()
      .subscribe(user => {
        this.user = user.profile;
      });
  }

  public onPublished(publication: NewsFeedPublication): void {
    this.cursor = null;
    this.loadPublications();
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

  public loadPublications(): void {
    this.showLoader = true;
    this.newsFeedService.newsFeedGet(null, this.itemsPerRequest, this.cursor,  'response').subscribe(resp => {
        this.cursor = resp.headers.get('x-cursor');
        this.hasMore = resp.body.length === this.itemsPerRequest;
        this.news = resp.body;
        this.showLoader = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.maxScroll = document.documentElement.scrollHeight;

    if (this.currentScroll === this.maxScroll && this.hasMore) {
      this.loadPublications();
    }
  }
}
