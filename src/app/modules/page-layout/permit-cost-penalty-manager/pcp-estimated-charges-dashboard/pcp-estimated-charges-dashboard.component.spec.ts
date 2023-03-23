import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpEstimatedChargesDashboardComponent } from './pcp-estimated-charges-dashboard.component';

describe('PcpEstimatedChargesDashboardComponent', () => {
  let component: PcpEstimatedChargesDashboardComponent;
  let fixture: ComponentFixture<PcpEstimatedChargesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpEstimatedChargesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpEstimatedChargesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
