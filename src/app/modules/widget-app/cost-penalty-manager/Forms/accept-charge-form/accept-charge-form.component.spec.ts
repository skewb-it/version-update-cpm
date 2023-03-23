import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptChargeFormComponent } from './accept-charge-form.component';

describe('AcceptChargeFormComponent', () => {
  let component: AcceptChargeFormComponent;
  let fixture: ComponentFixture<AcceptChargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptChargeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptChargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
