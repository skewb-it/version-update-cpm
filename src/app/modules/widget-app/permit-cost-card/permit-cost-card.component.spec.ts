import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitCostCardComponent } from './permit-cost-card.component';

describe('PermitCostCardComponent', () => {
  let component: PermitCostCardComponent;
  let fixture: ComponentFixture<PermitCostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitCostCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitCostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
