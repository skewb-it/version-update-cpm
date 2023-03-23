import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailInvoiceForm2Component } from './email-invoice-form2.component';

describe('EmailInvoiceForm2Component', () => {
  let component: EmailInvoiceForm2Component;
  let fixture: ComponentFixture<EmailInvoiceForm2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailInvoiceForm2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailInvoiceForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
