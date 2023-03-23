import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermitSelectConditionsComponent } from './create-permit-select-conditions.component';

describe('CreatePermitSelectConditionsComponent', () => {
  let component: CreatePermitSelectConditionsComponent;
  let fixture: ComponentFixture<CreatePermitSelectConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermitSelectConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermitSelectConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
