import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceChargeMatrixComponent } from './invoice-charge-matrix.component';

describe('InvoiceChargeMatrixComponent', () => {
  let component: InvoiceChargeMatrixComponent;
  let fixture: ComponentFixture<InvoiceChargeMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceChargeMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceChargeMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
