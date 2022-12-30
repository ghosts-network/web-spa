import { Component, OnInit, HostListener } from '@angular/core';
import {NewsFeedService} from '@gn/api';
import {ActivatedRoute} from '@angular/router';
import {NewsFeedList} from '@gn/resolvers';
import {AppConstants} from '@gn/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  public news: NewsFeedList | null;
  public currentUserId: string;

  public showLoader = false;
  private maxScroll: number;

  constructor(private newsFeedService: NewsFeedService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.currentUserId = data.claims.sub;
      this.news = data.news;
    });
  }

  public loadPublications(): void {
    this.showLoader = true;
    this.newsFeedService.newsFeedGet(null, AppConstants.NewsPerPage, this.news.cursor,  'response').subscribe(resp => {
        this.news.cursor = resp.headers.get(AppConstants.Headers.Cursor);
        this.news.hasMore = resp.body.length === AppConstants.NewsPerPage;
        this.news.publications = [].concat(this.news.publications, resp.body);
        this.showLoader = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    const currentScroll = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    this.maxScroll = document.documentElement.scrollHeight;

    if (currentScroll === this.maxScroll && this.news.hasMore) {
      this.loadPublications();
    }
  }
}
