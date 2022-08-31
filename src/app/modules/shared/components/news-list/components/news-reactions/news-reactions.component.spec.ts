import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactionsComponent } from './news-reactions.component';

describe('ReactionsComponent', () => {
  let component: ReactionsComponent;
  let fixture: ComponentFixture<ReactionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
