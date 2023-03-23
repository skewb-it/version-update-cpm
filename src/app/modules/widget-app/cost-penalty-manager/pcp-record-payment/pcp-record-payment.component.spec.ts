import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpRecordPaymentComponent } from './pcp-record-payment.component';

describe('PcpRecordPaymentComponent', () => {
  let component: PcpRecordPaymentComponent;
  let fixture: ComponentFixture<PcpRecordPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpRecordPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpRecordPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
