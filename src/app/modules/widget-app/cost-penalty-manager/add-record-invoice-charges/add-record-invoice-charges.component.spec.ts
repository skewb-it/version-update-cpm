import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordInvoiceChargesComponent } from './add-record-invoice-charges.component';

describe('AddRecordInvoiceChargesComponent', () => {
  let component: AddRecordInvoiceChargesComponent;
  let fixture: ComponentFixture<AddRecordInvoiceChargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecordInvoiceChargesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordInvoiceChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
