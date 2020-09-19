import { Component, OnInit } from '@angular/core';
import {NewsFeedPublication} from '../../modules/gateway-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.sass']
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public onPublished(publication: NewsFeedPublication): void {
    console.log(publication);
  }

}
