import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PublicationService} from "./publications.service";

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

  constructor(fb: FormBuilder, private publicationService: PublicationService) {
    this.news = [];

    this.form = fb.group({
      'content': ['', [Validators.required]]
    });

    this.loadPublications();
  }

  public sendPublication(): void {
    this.publicationService.insert({ content: this.form.get('content').value })
      .subscribe(resp => {
        console.log(resp);
        this.form.reset();
        this.loadPublications();
      });
  }

  public loadPublications() {
    this.publicationService.search().subscribe(resp => {
      this.news = resp;
    });
  }
}
