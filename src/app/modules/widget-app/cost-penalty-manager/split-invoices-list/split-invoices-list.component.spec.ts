import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitInvoicesListComponent } from './split-invoices-list.component';

describe('SplitInvoicesListComponent', () => {
  let component: SplitInvoicesListComponent;
  let fixture: ComponentFixture<SplitInvoicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitInvoicesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitInvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
