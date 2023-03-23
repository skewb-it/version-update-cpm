import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReinstatementFormComponent } from './create-reinstatement-form.component';

describe('CreateReinstatementFormComponent', () => {
  let component: CreateReinstatementFormComponent;
  let fixture: ComponentFixture<CreateReinstatementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReinstatementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReinstatementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
