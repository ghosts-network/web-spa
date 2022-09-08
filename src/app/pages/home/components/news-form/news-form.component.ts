import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NewsFeedPublication, NewsFeedService} from '../../../../modules/gateway-api';
import {interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {LinkInspectorService} from '../../../../providers/services/link-inspector/link-inspector.service';
import {LinkMeta} from '../../../../modules/shared/components/link-meta/link-meta';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  public form: UntypedFormGroup;
  urlsMeta = new Map<string, LinkMeta>();

  @Output()
  public OnPublished = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: UntypedFormBuilder,
              private newsFeedService: NewsFeedService,
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

  public get linkMeta(): LinkMeta[] {
    return Array.from(this.urlsMeta.values());
  }

  private extractLinks(content: string): string[] {
    const regexp = /(http|https):\/\/[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
    return [...content.matchAll(regexp)].map((value) => value[0]);
  }
}
