import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitChangeRequestTabComponent } from './permit-change-request-tab.component';

describe('PermitChangeRequestTabComponent', () => {
  let component: PermitChangeRequestTabComponent;
  let fixture: ComponentFixture<PermitChangeRequestTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitChangeRequestTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitChangeRequestTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
