import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermitFormComponent } from './create-permit-form.component';

describe('CreatePermitFormComponent', () => {
  let component: CreatePermitFormComponent;
  let fixture: ComponentFixture<CreatePermitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
