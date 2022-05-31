import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsFeedPublication, NewsFeedService} from '../../../../modules/gateway-api';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  public form: FormGroup;

  @Output()
  public OnPublished = new EventEmitter<NewsFeedPublication>();

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

    const model = {
      content: this.form.get('content').value
    };

    this.newsFeedService.newsFeedPost(model).subscribe(resp => {
      this.form.reset();
      this.OnPublished.emit(resp);
    });
  }
}
