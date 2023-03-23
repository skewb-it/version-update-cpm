import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeActivityLogTabComponent } from './charge-activity-log-tab.component';

describe('ChargeActivityLogTabComponent', () => {
  let component: ChargeActivityLogTabComponent;
  let fixture: ComponentFixture<ChargeActivityLogTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeActivityLogTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeActivityLogTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
