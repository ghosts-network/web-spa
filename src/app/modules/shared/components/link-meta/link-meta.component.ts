import {Component, Input, OnInit} from '@angular/core';
import {LinkMeta} from './link-meta';

@Component({
  selector: 'app-link-meta',
  templateUrl: './link-meta.component.html',
  styleUrls: ['./link-meta.component.scss']
})
export class LinkMetaComponent implements OnInit {

  @Input()
  public metas: LinkMeta[];

  constructor() { }

  ngOnInit(): void {
  }

}
