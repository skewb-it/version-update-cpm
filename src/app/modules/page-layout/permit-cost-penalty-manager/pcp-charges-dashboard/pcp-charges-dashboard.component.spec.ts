import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpChargesDashboardComponent } from './pcp-charges-dashboard.component';

describe('PcpChargesDashboardComponent', () => {
  let component: PcpChargesDashboardComponent;
  let fixture: ComponentFixture<PcpChargesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpChargesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpChargesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
