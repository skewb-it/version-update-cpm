import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpRecordInvoiceAmountComponent } from './pcp-record-invoice-amount.component';

describe('PcpRecordInvoiceAmountComponent', () => {
  let component: PcpRecordInvoiceAmountComponent;
  let fixture: ComponentFixture<PcpRecordInvoiceAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpRecordInvoiceAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpRecordInvoiceAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
