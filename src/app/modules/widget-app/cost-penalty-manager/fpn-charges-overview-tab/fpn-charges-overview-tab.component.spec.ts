import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FpnChargesOverviewTabComponent } from './fpn-charges-overview-tab.component';

describe('FpnChargesOverviewTabComponent', () => {
  let component: FpnChargesOverviewTabComponent;
  let fixture: ComponentFixture<FpnChargesOverviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FpnChargesOverviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FpnChargesOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
