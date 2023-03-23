import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignJobOwnerFormComponent } from './assign-job-owner-form.component';

describe('AssignJobOwnerFormComponent', () => {
  let component: AssignJobOwnerFormComponent;
  let fixture: ComponentFixture<AssignJobOwnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignJobOwnerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignJobOwnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
