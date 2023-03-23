import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpnChargeKeyDetailsComponent } from './fpn-charge-key-details.component';

describe('FpnChargeKeyDetailsComponent', () => {
  let component: FpnChargeKeyDetailsComponent;
  let fixture: ComponentFixture<FpnChargeKeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpnChargeKeyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpnChargeKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
