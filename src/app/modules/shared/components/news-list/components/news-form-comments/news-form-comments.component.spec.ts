import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFormCommentsComponent } from './news-form-comments.component';

describe('NewsFormCommentsComponent', () => {
  let component: NewsFormCommentsComponent;
  let fixture: ComponentFixture<NewsFormCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsFormCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFormCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
