import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitInvoiceListingComponent } from './split-invoice-listing.component';

describe('SplitInvoiceListingComponent', () => {
  let component: SplitInvoiceListingComponent;
  let fixture: ComponentFixture<SplitInvoiceListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitInvoiceListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitInvoiceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
