import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewsFormCommentsComponent } from './news-form-comments.component';

describe('NewsFormCommentsComponent', () => {
  let component: NewsFormCommentsComponent;
  let fixture: ComponentFixture<NewsFormCommentsComponent>;

  beforeEach(waitForAsync(() => {
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
