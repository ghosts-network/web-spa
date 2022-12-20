import {Component, OnInit} from '@angular/core';
import {FlashCardsSet} from './flash-cards-set';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-flash-carts-catalog',
  templateUrl: './flash-carts-catalog.page.html',
  styleUrls: ['./flash-carts-catalog.page.scss']
})
export class FlashCartsCatalogPage implements OnInit {

  sets: Array<FlashCardsSet> = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.data.subscribe(({ sets }) => {
      this.sets = sets;
    });
  }

  ngOnInit(): void {
  }

}

