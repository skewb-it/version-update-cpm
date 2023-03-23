import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficMangCostListComponent } from './traffic-mang-cost-list.component';

describe('TrafficMangCostListComponent', () => {
  let component: TrafficMangCostListComponent;
  let fixture: ComponentFixture<TrafficMangCostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficMangCostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficMangCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
