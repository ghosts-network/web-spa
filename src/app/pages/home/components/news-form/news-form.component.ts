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
      console.log(s);
      const regexp = /(https?):\/\/(www\.)?[a-z0-9\.:].*?(?=\s)/g;
      console.log([...s.matchAll(regexp)]);

      const body = new URLSearchParams();
      body.set('url', s);
      const options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      this.httpClient.post('http://localhost:3001', body, options)
        .subscribe(response => {
          console.log(response);
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
