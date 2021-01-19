import {Component, Inject, Input, OnInit} from '@angular/core';
import { Profile } from 'oidc-client';
import { NewsFeedPublication, NewsFeedService, PublicationComment} from '../../../../modules/gateway-api';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthService} from "../../../../providers/services/auth/auth.service";

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.scss']
})
export class NewsCommentsComponent implements OnInit {

  private take = 10;
  private skip = 3;
  private index: number;

  public currentUser: Profile;

  constructor(private newsFeedService: NewsFeedService,
              @Inject(MAT_DIALOG_DATA) public publication: NewsFeedPublication,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.currentUser = user
      });
  }

  public loadComments(): void {
    this.newsFeedService.newsFeedPublicationIdCommentsGet(this.publication.id, this.skip, this.take)
    .subscribe(resp => {
      this.publication.comments.topComments = this.publication.comments.topComments.concat(resp);
      this.skip += 10;
    });
  }

  public deleteComment(comment: PublicationComment): void {
    this.newsFeedService.newsFeedCommentsCommentIdDelete(comment.id)
    .subscribe(resp => {
      this.publication.comments.totalCount -= 1;
      this.index = this.publication.comments.topComments.findIndex(x => x.id === comment.id);
      this.publication.comments.topComments.splice(this.index, 1);
    });
  }

  public loadAllComments(): void {
    this.newsFeedService.newsFeedPublicationIdCommentsGet(this.publication.id, 0, 50)
    .subscribe(resp => {
      this.publication.comments.topComments = resp;
      this.publication.comments.totalCount += 1;
    });
  }

  public get isShown(): boolean {
    return this.publication.comments.totalCount !== this.publication.comments.topComments.length;
  }

}
