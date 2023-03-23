import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermitInspectionComponent } from './view-permit-inspection.component';

describe('ViewPermitInspectionComponent', () => {
  let component: ViewPermitInspectionComponent;
  let fixture: ComponentFixture<ViewPermitInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPermitInspectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermitInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
