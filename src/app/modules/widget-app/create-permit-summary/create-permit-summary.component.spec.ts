import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermitSummaryComponent } from './create-permit-summary.component';

describe('CreatePermitSummaryComponent', () => {
  let component: CreatePermitSummaryComponent;
  let fixture: ComponentFixture<CreatePermitSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermitSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermitSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
