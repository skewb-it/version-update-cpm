import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceCard2Component } from './performance-card2.component';

describe('PerformanceCard2Component', () => {
  let component: PerformanceCard2Component;
  let fixture: ComponentFixture<PerformanceCard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceCard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceCard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
