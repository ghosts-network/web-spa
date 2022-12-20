import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FlashCardsSet} from './flash-cards-set';

@Component({
  selector: 'app-flash-carts-details',
  templateUrl: './flash-carts-details.page.html',
  styleUrls: ['./flash-carts-details.page.scss']
})
export class FlashCartsDetailsPage implements OnInit {

  set: FlashCardsSet = null;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(({ set }) => {
      this.set = set;
    });
  }

  ngOnInit(): void {
  }

}
