import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeViewComponent } from './charge-view.component';

describe('ChargeViewComponent', () => {
  let component: ChargeViewComponent;
  let fixture: ComponentFixture<ChargeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
