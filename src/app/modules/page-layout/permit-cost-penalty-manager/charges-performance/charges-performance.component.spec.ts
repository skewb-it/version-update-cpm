import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesPerformanceComponent } from './charges-performance.component';

describe('ChargesPerformanceComponent', () => {
  let component: ChargesPerformanceComponent;
  let fixture: ComponentFixture<ChargesPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
