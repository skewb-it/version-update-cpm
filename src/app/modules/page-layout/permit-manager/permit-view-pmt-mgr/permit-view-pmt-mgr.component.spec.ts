import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitViewPmtMgrComponent } from './permit-view-pmt-mgr.component';

describe('PermitViewPmtMgrComponent', () => {
  let component: PermitViewPmtMgrComponent;
  let fixture: ComponentFixture<PermitViewPmtMgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitViewPmtMgrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitViewPmtMgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
