import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Profile } from 'oidc-client';
import { PublicationComment } from '../../../../../gateway-api';
import {TimeLimitChecker} from '../../classes/timeLimitCheker';

@Component({
  selector: 'app-news-comment-item',
  templateUrl: './news-comment-item.component.html',
  styleUrls: ['./news-comment-item.component.scss']
})
export class NewsCommentItemComponent implements OnInit {
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';

  public isEditNow = false;
  public form: UntypedFormGroup;
  public editIsEnabled = false;

  @Input()
  public currentUser: Profile;
  @Input()
  public comment: PublicationComment;

  @Output()
  public OnDeleted = new EventEmitter<PublicationComment>();
  @Output()
  public OnEdited = new EventEmitter<PublicationComment>();

  private timeLimitChecker: TimeLimitChecker = new TimeLimitChecker();

  constructor(private fb: UntypedFormBuilder) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.editIsEnabled = this.timeLimitChecker.isCommentEnabledToEdit(this.comment);
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
}
