import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisputeChargeFormComponent } from './dispute-charge-form.component';

describe('DisputeChargeFormComponent', () => {
  let component: DisputeChargeFormComponent;
  let fixture: ComponentFixture<DisputeChargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisputeChargeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisputeChargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
