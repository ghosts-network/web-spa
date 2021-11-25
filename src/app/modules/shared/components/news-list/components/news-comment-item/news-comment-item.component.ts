import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'oidc-client';
import { PublicationComment } from '../../../../../gateway-api';
import {TimeLimitCheker} from '../../classes/timeLimitCheker';

@Component({
  selector: 'app-news-comment-item',
  templateUrl: './news-comment-item.component.html',
  styleUrls: ['./news-comment-item.component.scss']
})
export class NewsCommentItemComponent implements OnInit {
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  
  public isEditNow: Boolean = false;
  public form: FormGroup;
  public timeLimitChecker: TimeLimitCheker = new TimeLimitCheker();

  @Input()
  public currentUser: Profile;
  @Input()
  public comment: PublicationComment;

  @Output()
  onDeleted = new EventEmitter<PublicationComment>();
  @Output()
  onEdited = new EventEmitter<PublicationComment>();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  public deleteComment() {
    this.onDeleted.emit(this.comment);
  }

  public editComment() {
    this.isEditNow = true;
    this.form.get('content').setValue(this.comment.content);
  }

  public editSubmitted() {
    if (this.form.valid) {
      if (this.comment.content == this.form.get('content').value) {
        this.isEditNow = false;
        return;
      }
      this.comment.content = this.form.get('content').value;
      this.onEdited.emit(this.comment);
      this.isEditNow = false;
    }
  }
}
