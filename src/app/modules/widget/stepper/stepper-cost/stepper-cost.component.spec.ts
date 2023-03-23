import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCostComponent } from './stepper-cost.component';

describe('StepperCostComponent', () => {
  let component: StepperCostComponent;
  let fixture: ComponentFixture<StepperCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
