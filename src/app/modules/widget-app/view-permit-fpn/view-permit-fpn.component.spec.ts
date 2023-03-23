import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermitFpnComponent } from './view-permit-fpn.component';

describe('ViewPermitFpnComponent', () => {
  let component: ViewPermitFpnComponent;
  let fixture: ComponentFixture<ViewPermitFpnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPermitFpnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermitFpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
