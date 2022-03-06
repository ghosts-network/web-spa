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

  public news: NewsFeedPublication[] = [];
  public user: Profile;
  private newsOnPage = 0;
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
    this.newsOnPage = 0;
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
    this.newsFeedService.newsFeedGet(this.newsOnPage, 20,  'response').subscribe(resp => {
        this.newsOnPage += resp.body.length;
        this.hasMore = (resp.headers.get('x-hasmore') === 'True');
        this.news = resp.body;
        this.showLoader = false;
    });
  }

  loadMore(): void {
    if (this.hasMore) {
      this.showLoader = true;
      this.newsFeedService.newsFeedGet(this.newsOnPage, 20, 'response').subscribe(resp => {
        this.newsOnPage += resp.body.length;
        this.hasMore = (resp.headers.get('x-hasmore') === 'True');
        this.news = [].concat(this.news, resp.body);
        this.showLoader = false;
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.maxScroll = document.documentElement.scrollHeight;

    if (this.currentScroll === this.maxScroll )   {
      this.loadMore();
    }
  }
}
