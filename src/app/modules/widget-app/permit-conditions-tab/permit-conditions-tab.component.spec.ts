import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitConditionsTabComponent } from './permit-conditions-tab.component';

describe('PermitConditionsTabComponent', () => {
  let component: PermitConditionsTabComponent;
  let fixture: ComponentFixture<PermitConditionsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitConditionsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitConditionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
