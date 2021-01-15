import { Component, OnInit } from '@angular/core';
import {NewsFeedPublication, NewsFeedService} from '../../modules/gateway-api';
import {AuthService} from "../../providers/services/auth/auth.service";
import {Profile} from "oidc-client";

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

  logout() {
    this.authService.logout();
  }
}
