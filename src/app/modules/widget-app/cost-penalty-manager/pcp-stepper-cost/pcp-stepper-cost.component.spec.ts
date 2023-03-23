import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpStepperCostComponent } from './pcp-stepper-cost.component';

describe('PcpStepperCostComponent', () => {
  let component: PcpStepperCostComponent;
  let fixture: ComponentFixture<PcpStepperCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpStepperCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpStepperCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
