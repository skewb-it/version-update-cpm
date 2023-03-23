import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialFinanceLiableComponent } from './potential-finance-liable.component';

describe('PotentialFinanceLiableComponent', () => {
  let component: PotentialFinanceLiableComponent;
  let fixture: ComponentFixture<PotentialFinanceLiableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialFinanceLiableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialFinanceLiableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
