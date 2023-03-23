import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelPermitConfirmationComponent } from './cancel-permit-confirmation.component';

describe('CancelPermitConfirmationComponent', () => {
  let component: CancelPermitConfirmationComponent;
  let fixture: ComponentFixture<CancelPermitConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelPermitConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelPermitConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
