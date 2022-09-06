import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {NewsFeedPublication, NewsFeedService} from '../../../../modules/gateway-api';
import {interval} from 'rxjs';
import {debounce} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  public form: UntypedFormGroup;
  public urlsMeta = new Map<string, any>();

  @Output()
  public OnPublished = new EventEmitter<NewsFeedPublication>();

  constructor(private fb: UntypedFormBuilder,
              private newsFeedService: NewsFeedService,
              private httpClient: HttpClient) {
    this.form = fb.group({
      content: ['', [Validators.required]]
    });

    this.form.get('content').valueChanges
      .pipe(debounce(() => interval(1000)))
      .subscribe(s => {
        const regexp = /(http|https)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/g;
        const parsedUrls = [...s.matchAll(regexp)].map((value, index, array) => value[0]);

        const newUrls = [];
        for (const parsedUrl of parsedUrls) {
          if (!this.urlsMeta.has(parsedUrl)) {
            newUrls.push(parsedUrl);
          }
        }

        if (newUrls.length === 0) {
          return;
        }

        const body = {
          urls: newUrls
        };
        const options = {
          headers: new HttpHeaders().set('Content-Type', 'application/json')
        };
        this.httpClient.post('http://boberneprotiv.com:3001', body, options)
          .subscribe(response => {
            for (const responseKey in response) {
              this.urlsMeta.set(responseKey, response[responseKey]);
            }
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
}
