import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpManagementDashboard2Component } from './pcp-management-dashboard2.component';

describe('PcpManagementDashboard2Component', () => {
  let component: PcpManagementDashboard2Component;
  let fixture: ComponentFixture<PcpManagementDashboard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpManagementDashboard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpManagementDashboard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
