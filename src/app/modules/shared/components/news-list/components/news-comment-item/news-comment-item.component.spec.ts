import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCommentItemComponent } from './news-comment-item.component';

describe('NewsCommentItemComponent', () => {
  let component: NewsCommentItemComponent;
  let fixture: ComponentFixture<NewsCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
