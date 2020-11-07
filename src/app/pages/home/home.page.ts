import { Component, OnInit } from '@angular/core';
import {NewsFeedPublication, NewsFeedService} from '../../modules/gateway-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  public news: NewsFeedPublication[];

  constructor(private newsFeedService: NewsFeedService) { }

  ngOnInit(): void {
    this.loadPublications();
  }

  public onPublished(publication: NewsFeedPublication): void {
    this.loadPublications();
  }

  public loadPublications = (): void => {
    this.newsFeedService.newsFeedGet().subscribe(resp => {
      this.news = resp;
    });
  }
}
