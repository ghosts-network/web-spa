import { Profile } from 'oidc-client';
import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import { NewsFeedPublication } from '../../../../../gateway-api';
import {Reactions} from "../../../reactions/reactions.component";
import { TimeLimitCheker } from '../../classes/timeLimitCheker';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  private timeLimitChecker: TimeLimitCheker = new TimeLimitCheker();
  
  public isEditNow: Boolean = false;
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  public editIsEnabled: Boolean = false;
  public form: FormGroup;
  
  @Input()
  public publication: NewsFeedPublication;
  @Input()
  public currentUser: Profile;

  @Output()
  onDeleted = new EventEmitter<NewsFeedPublication>();
  @Output()
  onEdited = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.editIsEnabled = this.timeLimitChecker.isPublicationEnabledToEdit(this.publication);
  }

  public get isCurrentUserPost(): boolean {
    return this.currentUser.sub == this.publication.author.id;
  }

  public deleteClick(): void {
    this.onDeleted.emit(this.publication);
  }

  public editPublication() {
    if (this.isEditNow) {
      this.isEditNow = false;
    } else {
      this.isEditNow = true;
      this.form.get('content').setValue(this.publication.content);
    }
  }

  public editSubmitted() {
    if (this.form.valid) {
      if (this.publication.content == this.form.get('content').value) {
        this.isEditNow = false;
        return;
      }
      this.publication.content = this.form.get('content').value;
      this.onEdited.emit(this.publication);
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
}
