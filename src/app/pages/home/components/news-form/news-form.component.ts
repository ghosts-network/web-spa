import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsFeedPublication, NewsFeedService} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.sass']
})
export class NewsFormComponent implements OnInit {

  public form: FormGroup;

  @Output()
  public published = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: FormBuilder,
              private newsFeedService: NewsFeedService) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public formSubmitted(): void {
    if (!this.form.valid) {
      return;
    }

    this.newsFeedService.newsFeedPost({
      content: this.form.get('content').value
    })
      .subscribe(
        resp => {
          this.form.reset();
          this.published.emit(resp);
        }
      );
  }
}
