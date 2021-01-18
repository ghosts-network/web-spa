import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationActionsComponent } from './publication-actions.component';

describe('PublicationActionsComponent', () => {
  let component: PublicationActionsComponent;
  let fixture: ComponentFixture<PublicationActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
