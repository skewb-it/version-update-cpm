import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveChargeFormComponent } from './approve-charge-form.component';

describe('ApproveChargeFormComponent', () => {
  let component: ApproveChargeFormComponent;
  let fixture: ComponentFixture<ApproveChargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveChargeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveChargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
