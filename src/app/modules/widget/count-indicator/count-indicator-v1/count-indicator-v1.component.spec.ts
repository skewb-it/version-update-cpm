import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountIndicatorV1Component } from './count-indicator-v1.component';

describe('CountIndicatorV1Component', () => {
  let component: CountIndicatorV1Component;
  let fixture: ComponentFixture<CountIndicatorV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountIndicatorV1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountIndicatorV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
