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

  public news: NewsFeedPublication[];
  public user: Profile;

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
    this.loadPublications();
  }

  public loadPublications(): void {
    this.newsFeedService.newsFeedGet().subscribe(resp => {
      this.news = resp;
    });
  }

  logout() {
    this.authService.logout();
  }
}
