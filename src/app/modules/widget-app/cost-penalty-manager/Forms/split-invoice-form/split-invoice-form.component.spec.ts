import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitInvoiceFormComponent } from './split-invoice-form.component';

describe('SplitInvoiceFormComponent', () => {
  let component: SplitInvoiceFormComponent;
  let fixture: ComponentFixture<SplitInvoiceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitInvoiceFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitInvoiceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
