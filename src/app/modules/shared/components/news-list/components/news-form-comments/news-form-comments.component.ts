import {Component, EventEmitter, Output, Input} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NewsFeedPublication, NewsFeedService} from '@gn/api';

@Component({
  selector: 'app-news-form-comments',
  templateUrl: './news-form-comments.component.html',
  styleUrls: ['./news-form-comments.component.scss']
})
export class NewsFormCommentsComponent {
  public form: UntypedFormGroup;

  @Input()
  public publication: NewsFeedPublication;
  @Output()
  public published = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: UntypedFormBuilder,
              private newsFeedService: NewsFeedService) {
      this.form = fb.group({
        content: ['', [Validators.required]]
      });
    }

  public formSubmitted(): void {
    if (!this.form.valid) {
      return;
    }

    this.newsFeedService.newsFeedPublicationIdCommentsPost(
      this.publication.id, {content: this.form.get('content').value})
    .subscribe(resp => {
      this.form.reset();
      this.published.emit(resp);
    });
  }
}
