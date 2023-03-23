import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountIndicatorComponent } from './count-indicator.component';

describe('CountIndicatorComponent', () => {
  let component: CountIndicatorComponent;
  let fixture: ComponentFixture<CountIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
