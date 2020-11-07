import {Component, EventEmitter, Output, Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsFeedPublication, NewsFeedService} from '../../../../modules/gateway-api';
import {HomePage} from '../../home.page';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  public form: FormGroup;

  @Input()
  public publication: NewsFeedPublication;
  @Input()
  public loadPublications: any;
  @Output()
  public published = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: FormBuilder,
              private newsFeedService: NewsFeedService) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  public formSubmitted(): void {
    if (!this.form.valid) {
      return;
    }

    this.newsFeedService.newsFeedPublicationIdCommentPost(
      this.publication.id, {content: this.form.get('content').value})
    .subscribe(resp => {
      this.form.reset();
      this.published.emit(resp);
      this.loadPublications();
    });
  }

}
