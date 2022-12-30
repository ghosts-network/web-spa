import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NewsFeedPublication} from '@gn/api';
import {Reactions} from '../../../reactions/reactions.component';
import {TimeLimitChecker} from '../../classes/timeLimitCheker';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AppConstants} from '@gn/constants';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent {
  @Input()
  public currentUserId: string;

  public isEditNow = false;
  public DefaultAvatar = AppConstants.DefaultAvatar;

  public form: UntypedFormGroup;

  @Input()
  public publication: NewsFeedPublication;

  @Output()
  public OnDeleted = new EventEmitter<NewsFeedPublication>();
  @Output()
  public OnEdited = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: UntypedFormBuilder,
              private timeLimitChecker: TimeLimitChecker) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  public deleteClick(): void {
    this.OnDeleted.emit(this.publication);
  }

  public editPublication(): void {
    if (this.isEditNow) {
      this.isEditNow = false;
    } else {
      this.isEditNow = true;
      this.form.get('content').setValue(this.publication.content);
    }
  }

  public editSubmitted(): void {
    if (this.form.valid) {
      if (this.publication.content === this.form.get('content').value) {
        this.isEditNow = false;
        return;
      }
      this.publication.content = this.form.get('content').value;
      this.OnEdited.emit(this.publication);
      this.isEditNow = false;
    }
  }

  public get reactions(): Reactions {
    const r = this.publication.reactions;
    return {
      totalCount: r.totalCount,
      types: r.reactions
    };
  }

  public get deletable(): boolean {
    return this.currentUserId === this.publication.author.id;
  }

  public get editable(): boolean {
    return this.currentUserId === this.publication.author.id
      && this.timeLimitChecker.isPublicationEnabledToEdit(this.publication);
  }
}
