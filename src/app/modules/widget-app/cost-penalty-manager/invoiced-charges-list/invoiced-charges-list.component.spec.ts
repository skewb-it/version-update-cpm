import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedChargesListComponent } from './invoiced-charges-list.component';

describe('InvoicedChargesListComponent', () => {
  let component: InvoicedChargesListComponent;
  let fixture: ComponentFixture<InvoicedChargesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedChargesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicedChargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
