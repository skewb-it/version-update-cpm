import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditChargeFormComponent } from './audit-charge-form.component';

describe('AuditChargeFormComponent', () => {
  let component: AuditChargeFormComponent;
  let fixture: ComponentFixture<AuditChargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditChargeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditChargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
