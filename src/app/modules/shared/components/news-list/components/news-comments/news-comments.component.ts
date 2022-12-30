import {Component, Inject, OnInit} from '@angular/core';
import {NewsFeedPublication, NewsFeedService, PublicationComment} from '@gn/api';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {AppConstants} from '@gn/constants';
import {AuthService} from '../../../../../../providers/services/auth/auth.service';

@Component({
  selector: 'app-news-comments',
  templateUrl: './news-comments.component.html',
  styleUrls: ['./news-comments.component.scss']
})
export class NewsCommentsComponent implements OnInit {

  private cursor: string;
  private index: number;

  public comments = new Array<PublicationComment>();

  public currentUserId: string;

  constructor(private newsFeedService: NewsFeedService,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public publication: NewsFeedPublication) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(user => {
      this.currentUserId = user.sub;
    });

    this.loadComments();
  }

  public loadComments(): void {
    this.newsFeedService.newsFeedPublicationIdCommentsGet(this.publication.id, null, AppConstants.CommentsPerPage, this.cursor, 'response')
    .subscribe(resp => {
      this.comments = this.comments.concat(resp.body);
      this.cursor = resp.headers.get(AppConstants.Headers.Cursor);
    });
  }

  public onDelete(comment: PublicationComment): void {
    this.newsFeedService.newsFeedCommentsCommentIdDelete(comment.id)
    .subscribe(_ => {
      this.publication.comments.totalCount -= 1;
      this.index = this.comments.findIndex(x => x.id === comment.id);
      this.comments.splice(this.index, 1);
    });
  }

  public onEdit(comment: PublicationComment): void {
    this.newsFeedService.newsFeedCommentsCommentIdPut(comment.id, { content : comment.content })
      .subscribe(() => {
        this.comments.find(x => x.id === comment.id).content = comment.content;
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
