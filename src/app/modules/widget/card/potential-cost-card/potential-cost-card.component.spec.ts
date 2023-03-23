import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialCostCardComponent } from './potential-cost-card.component';

describe('PotentialCostCardComponent', () => {
  let component: PotentialCostCardComponent;
  let fixture: ComponentFixture<PotentialCostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialCostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialCostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
