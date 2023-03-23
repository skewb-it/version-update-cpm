import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordInvoiceAmountFormComponent } from './record-invoice-amount-form.component';

describe('RecordInvoiceAmountFormComponent', () => {
  let component: RecordInvoiceAmountFormComponent;
  let fixture: ComponentFixture<RecordInvoiceAmountFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordInvoiceAmountFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordInvoiceAmountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
