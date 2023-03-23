import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpManagementDashboard1Component } from './pcp-management-dashboard1.component';

describe('PcpManagementDashboard1Component', () => {
  let component: PcpManagementDashboard1Component;
  let fixture: ComponentFixture<PcpManagementDashboard1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpManagementDashboard1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpManagementDashboard1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
