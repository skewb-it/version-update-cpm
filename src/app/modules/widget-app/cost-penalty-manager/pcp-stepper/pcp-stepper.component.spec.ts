import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpStepperComponent } from './pcp-stepper.component';

describe('PcpStepperComponent', () => {
  let component: PcpStepperComponent;
  let fixture: ComponentFixture<PcpStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
