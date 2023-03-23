import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitActivityLogTabComponent } from './permit-activity-log-tab.component';

describe('PermitActivityLogTabComponent', () => {
  let component: PermitActivityLogTabComponent;
  let fixture: ComponentFixture<PermitActivityLogTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitActivityLogTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitActivityLogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
