import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseChangeReqConfirmationComponent } from './raise-change-req-confirmation.component';

describe('RaiseChangeReqConfirmationComponent', () => {
  let component: RaiseChangeReqConfirmationComponent;
  let fixture: ComponentFixture<RaiseChangeReqConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaiseChangeReqConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseChangeReqConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
