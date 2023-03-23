import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitFpnTabComponent } from './permit-fpn-tab.component';

describe('PermitFpnTabComponent', () => {
  let component: PermitFpnTabComponent;
  let fixture: ComponentFixture<PermitFpnTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitFpnTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitFpnTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
