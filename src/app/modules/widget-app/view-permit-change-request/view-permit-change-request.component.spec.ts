import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermitChangeRequestComponent } from './view-permit-change-request.component';

describe('ViewPermitChangeRequestComponent', () => {
  let component: ViewPermitChangeRequestComponent;
  let fixture: ComponentFixture<ViewPermitChangeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPermitChangeRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermitChangeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
