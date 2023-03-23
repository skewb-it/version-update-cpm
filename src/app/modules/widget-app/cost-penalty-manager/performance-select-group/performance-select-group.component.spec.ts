import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceSelectGroupComponent } from './performance-select-group.component';

describe('PerformanceSelectGroupComponent', () => {
  let component: PerformanceSelectGroupComponent;
  let fixture: ComponentFixture<PerformanceSelectGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceSelectGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceSelectGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
