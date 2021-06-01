import {Component, Input} from '@angular/core';
import {NewsFeedPublication} from "../../../../../gateway-api";
import {MatDialog} from "@angular/material/dialog";
import {NewsCommentsComponent} from "../news-comments/news-comments.component";

@Component({
  selector: 'app-publication-actions',
  templateUrl: './publication-actions.component.html',
  styleUrls: ['./publication-actions.component.scss']
})
export class PublicationActionsComponent {

  @Input() publication: NewsFeedPublication;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(NewsCommentsComponent, {
      data: this.publication
    });
  }

}
