import {Component, Input, OnInit} from '@angular/core';
import {NewsFeedPublication, NewsFeedService, PublicationComment} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  private take = 10;
  private skip = 3;
  private index: number;

  @Input()
  public publication: NewsFeedPublication;

  constructor(private newsFeedService: NewsFeedService) { }

  ngOnInit(): void {
    this.isShown.valueOf();
  }

  public loadComments(): void {
    this.newsFeedService.newsFeedPublicationIdCommentsGet(this.publication.id, this.skip, this.take)
    .subscribe(resp => {
      this.publication.comments.topComments = this.publication.comments.topComments.concat(resp);
      this.take += 10;
      this.skip += 10;
      this.isShown.valueOf();
    });
  }

  public deleteComment(comment: PublicationComment): void {
    this.newsFeedService.newsFeedCommentIdCommentDelete(comment.id)
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
    if (this.publication.comments.totalCount === this.publication.comments.topComments.length){
      return false;
    }

    return true;
  }
}
