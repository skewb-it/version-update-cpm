import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpInvoicesDashboardComponent } from './pcp-invoices-dashboard.component';

describe('PcpInvoicesDashboardComponent', () => {
  let component: PcpInvoicesDashboardComponent;
  let fixture: ComponentFixture<PcpInvoicesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpInvoicesDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpInvoicesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
