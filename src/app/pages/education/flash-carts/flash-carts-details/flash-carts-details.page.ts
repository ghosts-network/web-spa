import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FlashCardsSet} from './flash-cards-set';
import {FormBuilder} from '@angular/forms';
import {FlashCardsService} from '../../../../providers/services/flash-cards/flash-cards.service';

@Component({
  selector: 'app-flash-carts-details',
  templateUrl: './flash-carts-details.page.html',
  styleUrls: ['./flash-carts-details.page.scss']
})
export class FlashCartsDetailsPage implements OnInit {

  set: FlashCardsSet = null;
  currentCard = 0;

  form = this.fb.group({
    answer: this.fb.control<string>(''),
    answers: this.fb.array<AnswerModel>([])
  });

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private flashCardsService: FlashCardsService) {
    this.activatedRoute.data.subscribe(({ set }) => {
      this.set = set;
      this.form.setControl('answers', this.fb.array<AnswerModel>(set.cards.map(card => {
        return this.fb.group({
          cardId: this.fb.control<string>(card.id),
          answer: ''
        });
      })));
    });
  }

  ngOnInit(): void {
  }

  onAnswerSubmit(event): void {
    event.preventDefault();
    this.form.controls.answers.at(this.currentCard).get('answer').setValue(this.form.controls.answer.value);
    this.currentCard++;

    if (this.currentCard === this.set.cards.length) {
      const result = {
        answers: this.form.controls.answers.value
      };
      this.flashCardsService.saveProgress(this.set.id, result)
        .subscribe(() => {
          console.log('progress saved');
        });
      return;
    }

    document.getElementById(`card_${this.set.cards[this.currentCard].definition}`).scrollIntoView();
  }

}

interface AnswerModel {
  cardId: string;
  answer: string;
}
