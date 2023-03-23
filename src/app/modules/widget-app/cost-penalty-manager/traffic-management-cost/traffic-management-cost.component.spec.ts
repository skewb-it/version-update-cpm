import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficManagementCostComponent } from './traffic-management-cost.component';

describe('TrafficManagementCostComponent', () => {
  let component: TrafficManagementCostComponent;
  let fixture: ComponentFixture<TrafficManagementCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficManagementCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficManagementCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
