import {Component, Inject, OnInit} from '@angular/core';
import { Profile } from 'oidc-client';
import { NewsFeedPublication, NewsFeedService, PublicationComment } from '../../../../../gateway-api';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AuthService} from "../../../../../../providers/services/auth/auth.service";

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.scss']
})
export class NewsCommentsComponent implements OnInit {

  private take = 10;
  private skip = 0;
  private index: number;

  public comments = new Array<PublicationComment>();
  
  public currentUser: Profile;

  constructor(private newsFeedService: NewsFeedService,
              @Inject(MAT_DIALOG_DATA) public publication: NewsFeedPublication,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.currentUser = user
      });
    this.loadComments();
  }

  public loadComments(): void {
    this.newsFeedService.newsFeedPublicationIdCommentsGet(this.publication.id, this.skip, this.take)
    .subscribe(resp => {
      this.comments = this.comments.concat(resp);
      this.skip += 10;
    });
  }

  public onDelete(comment: PublicationComment): void {
    this.newsFeedService.newsFeedCommentsCommentIdDelete(comment.id)
    .subscribe(resp => {
      this.publication.comments.totalCount -= 1;
      this.index = this.comments.findIndex(x => x.id === comment.id);
      this.comments.splice(this.index, 1);
    });
  }

  public onEdit(comment: PublicationComment): void {
    this.newsFeedService.newsFeedCommentsCommentIdPut(comment.id, { content : comment.content })
      .subscribe(() => {
        this.comments.find(x => x.id == comment.id).content = comment.content;
      });
  }

  public loadAllComments(): void {
    this.newsFeedService.newsFeedPublicationIdCommentsGet(this.publication.id, 0, 50)
    .subscribe(resp => {
      this.comments = resp;
      this.publication.comments.totalCount += 1;
    });
  }

  public get hasMore(): boolean {
    return this.publication.comments.totalCount !== this.comments.length;
  }
}
