import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ReactionsPgComponent } from './reactions-pg.component';

describe('ReactionsPgComponent', () => {
  let component: ReactionsPgComponent;
  let fixture: ComponentFixture<ReactionsPgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ReactionsPgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactionsPgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
