import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {NewsFeedPublication} from '@gn/api';
import {Reactions} from '../../../reactions/reactions.component';
import {TimeLimitChecker} from '../../classes/timeLimitCheker';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {
  private timeLimitChecker: TimeLimitChecker = new TimeLimitChecker();

  public isEditNow = false;
  public DefaultAvatar = 'https://material.angular.io/assets/img/examples/shiba1.jpg';
  public editTimeFinished = false;
  public form: UntypedFormGroup;

  @Input()
  public publication: NewsFeedPublication;
  @Input()
  public deleteEnabled = false;
  @Input()
  public editEnabled = false;

  @Output()
  public OnDeleted = new EventEmitter<NewsFeedPublication>();
  @Output()
  public OnEdited = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: UntypedFormBuilder) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.editTimeFinished = !this.timeLimitChecker.isPublicationEnabledToEdit(this.publication);
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
}
