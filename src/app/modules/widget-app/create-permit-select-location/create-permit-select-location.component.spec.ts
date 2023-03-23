import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermitSelectLocationComponent } from './create-permit-select-location.component';

describe('CreatePermitSelectLocationComponent', () => {
  let component: CreatePermitSelectLocationComponent;
  let fixture: ComponentFixture<CreatePermitSelectLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermitSelectLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermitSelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
