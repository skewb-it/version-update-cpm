import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationViewerChartComponent } from './duration-viewer-chart.component';

describe('DurationViewerChartComponent', () => {
  let component: DurationViewerChartComponent;
  let fixture: ComponentFixture<DurationViewerChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationViewerChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationViewerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
