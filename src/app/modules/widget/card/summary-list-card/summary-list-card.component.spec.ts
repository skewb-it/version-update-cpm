import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryListCardComponent } from './summary-list-card.component';

describe('SummaryListCardComponent', () => {
  let component: SummaryListCardComponent;
  let fixture: ComponentFixture<SummaryListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryListCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
