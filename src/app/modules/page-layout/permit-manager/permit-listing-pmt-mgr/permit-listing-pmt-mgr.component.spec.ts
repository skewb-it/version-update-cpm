import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitListingPmtMgrComponent } from './permit-listing-pmt-mgr.component';

describe('PermitListingPmtMgrComponent', () => {
  let component: PermitListingPmtMgrComponent;
  let fixture: ComponentFixture<PermitListingPmtMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitListingPmtMgrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitListingPmtMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
