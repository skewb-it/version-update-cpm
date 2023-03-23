import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesAndAmountCardComponent } from './charges-and-amount-card.component';

describe('ChargesAndAmountCardComponent', () => {
  let component: ChargesAndAmountCardComponent;
  let fixture: ComponentFixture<ChargesAndAmountCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesAndAmountCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesAndAmountCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
