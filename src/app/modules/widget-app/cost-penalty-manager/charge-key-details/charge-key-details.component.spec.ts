import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeKeyDetailsComponent } from './charge-key-details.component';

describe('ChargeKeyDetailsComponent', () => {
  let component: ChargeKeyDetailsComponent;
  let fixture: ComponentFixture<ChargeKeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeKeyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
