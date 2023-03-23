import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailsBarComponent } from './invoice-details-bar.component';

describe('InvoiceDetailsBarComponent', () => {
  let component: InvoiceDetailsBarComponent;
  let fixture: ComponentFixture<InvoiceDetailsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
