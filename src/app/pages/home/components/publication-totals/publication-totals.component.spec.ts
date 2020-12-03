import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationTotalsComponent } from './publication-totals.component';

describe('PublicationTotalsComponent', () => {
  let component: PublicationTotalsComponent;
  let fixture: ComponentFixture<PublicationTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
