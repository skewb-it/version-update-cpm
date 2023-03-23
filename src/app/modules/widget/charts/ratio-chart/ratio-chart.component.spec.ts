import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatioChartComponent } from './ratio-chart.component';

describe('RatioChartComponent', () => {
  let component: RatioChartComponent;
  let fixture: ComponentFixture<RatioChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatioChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
