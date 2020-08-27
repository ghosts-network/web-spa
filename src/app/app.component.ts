import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Publication {
  content: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  news: Publication[];

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.news = [
      { content: 'My first news' },
      { content: 'My second news' },
      { content: 'My third news' }
    ];

    this.form = fb.group({
      'content': ['', [Validators.required]]
    });
  }

  public sendPublication(): void {
    console.log(this.form.get('content').value);
    this.news.push({ content: this.form.get('content').value });
    this.form.reset();
  }
}
