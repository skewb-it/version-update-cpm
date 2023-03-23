import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpOperationalDashboardComponent } from './pcp-operational-dashboard.component';

describe('PcpOperationalDashboardComponent', () => {
  let component: PcpOperationalDashboardComponent;
  let fixture: ComponentFixture<PcpOperationalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpOperationalDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpOperationalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
