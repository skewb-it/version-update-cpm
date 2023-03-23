import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLiabilityFormComponent } from './assign-liability-form.component';

describe('AssignLiabilityFormComponent', () => {
  let component: AssignLiabilityFormComponent;
  let fixture: ComponentFixture<AssignLiabilityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLiabilityFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLiabilityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
