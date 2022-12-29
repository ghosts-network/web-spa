import { Component, OnInit, HostListener } from '@angular/core';
import {NewsFeedPublication, NewsFeedService} from '@gn/api';
import {Profile} from 'oidc-client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  private itemsPerRequest = 20;

  public news: NewsFeedPublication[] = [];
  public user: Profile;
  public cursor: string;
  public hasMore: boolean;
  public showLoader = false;
  private maxScroll: number;
  private currentScroll: number;

  constructor(private newsFeedService: NewsFeedService,
              private route: ActivatedRoute) {
    this.user = this.route.snapshot.data.user;
  }

  ngOnInit(): void {
    this.loadPublications();
  }

  public onPublished(): void {
    this.cursor = null;
    this.news = [];
    this.loadPublications();
  }

  public onDeleted(publication: NewsFeedPublication): void {
    this.newsFeedService.newsFeedPublicationIdDelete(publication.id).subscribe(resp => {
      this.news = this.news.filter(pub => pub.id !== publication.id);
    });
  }

  public onEdited(publication: NewsFeedPublication): void {
    const body = { content : publication.content };
    this.newsFeedService.newsFeedPublicationIdPut(publication.id, body).subscribe(resp => {

    });
  }

  public loadPublications(): void {
    this.showLoader = true;
    this.newsFeedService.newsFeedGet(null, this.itemsPerRequest, this.cursor,  'response').subscribe(resp => {
        this.cursor = resp.headers.get('x-cursor');
        this.hasMore = resp.body.length === this.itemsPerRequest;
        this.news = [].concat(this.news, resp.body);
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
