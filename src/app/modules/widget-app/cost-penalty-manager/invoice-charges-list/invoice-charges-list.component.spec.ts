import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceChargesListComponent } from './invoice-charges-list.component';

describe('InvoiceChargesListComponent', () => {
  let component: InvoiceChargesListComponent;
  let fixture: ComponentFixture<InvoiceChargesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceChargesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceChargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
