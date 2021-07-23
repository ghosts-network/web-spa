import {Component, OnInit} from '@angular/core';
import {Reactions, ReactionType} from "../../../modules/shared/components/reactions/reactions.component";

@Component({
  selector: 'app-reactions-pg',
  templateUrl: './reactions-pg.component.html',
  styleUrls: ['./reactions-pg.component.scss']
})
export class ReactionsPgComponent implements OnInit {

  constructor() { }

  public get reactions(): Reactions {
    return {
      totalCount: 10,
      types: [ReactionType.Like, ReactionType.Angry]
    };
  }

  ngOnInit(): void {
  }

}
