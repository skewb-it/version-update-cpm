import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpRequestPaymentApprovalComponent } from './pcp-request-payment-approval.component';

describe('PcpRequestPaymentApprovalComponent', () => {
  let component: PcpRequestPaymentApprovalComponent;
  let fixture: ComponentFixture<PcpRequestPaymentApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpRequestPaymentApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpRequestPaymentApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
