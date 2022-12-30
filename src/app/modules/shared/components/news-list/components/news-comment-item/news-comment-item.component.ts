import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { PublicationComment } from '@gn/api';
import { TimeLimitChecker } from '../../classes/timeLimitCheker';
import { AppConstants } from '@gn/constants';

@Component({
  selector: 'app-news-comment-item',
  templateUrl: './news-comment-item.component.html',
  styleUrls: ['./news-comment-item.component.scss']
})
export class NewsCommentItemComponent {
  public DefaultAvatar = AppConstants.DefaultAvatar;

  public isEditNow = false;
  public form: UntypedFormGroup;

  @Input()
  public currentUserId: string;
  @Input()
  public comment: PublicationComment;

  @Output()
  public OnDeleted = new EventEmitter<PublicationComment>();
  @Output()
  public OnEdited = new EventEmitter<PublicationComment>();

  constructor(private timeLimitChecker: TimeLimitChecker,
              private fb: UntypedFormBuilder) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  public deleteComment(): void {
    this.OnDeleted.emit(this.comment);
  }

  public editComment(): void {
    if (this.isEditNow) {
      this.isEditNow = false;
    } else {
      this.isEditNow = true;
      this.form.get('content').setValue(this.comment.content);
    }
  }

  public editSubmitted(): void {
    if (this.form.valid) {
      if (this.comment.content === this.form.get('content').value) {
        this.isEditNow = false;
        return;
      }
      this.comment.content = this.form.get('content').value;
      this.OnEdited.emit(this.comment);
      this.isEditNow = false;
    }
  }

  public get deletable(): boolean {
    return this.currentUserId === this.comment.author.id;
  }

  public get editable(): boolean {
    return this.currentUserId === this.comment.author.id
      && this.timeLimitChecker.isCommentEnabledToEdit(this.comment);
  }
}
