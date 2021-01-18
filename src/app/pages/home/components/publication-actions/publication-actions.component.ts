import {Component, Input, OnInit} from '@angular/core';
import {NewsFeedPublication} from "../../../../modules/gateway-api";

@Component({
  selector: 'app-publication-actions',
  templateUrl: './publication-actions.component.html',
  styleUrls: ['./publication-actions.component.scss']
})
export class PublicationActionsComponent implements OnInit {

  @Input() publication: NewsFeedPublication;

  constructor() { }

  ngOnInit(): void {
  }

}
