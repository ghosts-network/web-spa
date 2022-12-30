import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {LinkInspectorService} from '@ng/link-inspector';
import {LinkMeta} from '../link-meta/link-meta';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent {

  public form: FormGroup;
  urlsMeta = new Map<string, LinkMeta>();

  @Output()
  public OnPublishClicked = new EventEmitter<NewPublication>();

  constructor(private fb: FormBuilder,
              private linkInspectorService: LinkInspectorService) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });

    this.form.get('content').valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe(s => {
        const parsedUrls = this.extractLinks(s);
        if (parsedUrls.length === 0) {
          this.urlsMeta = new Map<string, LinkMeta>();
          return;
        }

        const url = parsedUrls[0];
        if (this.urlsMeta.has(url)) {
          return;
        }

        this.linkInspectorService.getMeta([url])
          .subscribe(response => {
            this.urlsMeta = new Map<string, LinkMeta>([[url, response[url]]]);
          });
    });
  }

  public formSubmitted(): void {
    if (!this.form.valid) {
      return;
    }

    this.OnPublishClicked.emit(this.form.value);
    this.form.get('content').reset('');
  }

  public get linkMeta(): LinkMeta[] {
    return Array.from(this.urlsMeta.values());
  }

  private extractLinks(content: string): string[] {
    const regexp = /(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
    return [...content.matchAll(regexp)].map((value) => value[0]);
  }
}

export interface NewPublication {
  content: string;
}
