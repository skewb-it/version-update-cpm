import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitMapTabComponent } from './permit-map-tab.component';

describe('PermitMapTabComponent', () => {
  let component: PermitMapTabComponent;
  let fixture: ComponentFixture<PermitMapTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitMapTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitMapTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
