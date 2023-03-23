import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReinstatementSummaryComponent } from './create-reinstatement-summary.component';

describe('CreateReinstatementSummaryComponent', () => {
  let component: CreateReinstatementSummaryComponent;
  let fixture: ComponentFixture<CreateReinstatementSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReinstatementSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReinstatementSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
