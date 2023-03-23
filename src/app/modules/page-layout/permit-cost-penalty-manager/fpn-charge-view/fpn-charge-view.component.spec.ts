import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpnChargeViewComponent } from './fpn-charge-view.component';

describe('FpnChargeViewComponent', () => {
  let component: FpnChargeViewComponent;
  let fixture: ComponentFixture<FpnChargeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpnChargeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpnChargeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
