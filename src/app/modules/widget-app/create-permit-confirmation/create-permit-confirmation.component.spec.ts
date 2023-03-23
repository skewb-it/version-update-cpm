import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermitConfirmationComponent } from './create-permit-confirmation.component';

describe('CreatePermitConfirmationComponent', () => {
  let component: CreatePermitConfirmationComponent;
  let fixture: ComponentFixture<CreatePermitConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermitConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermitConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
