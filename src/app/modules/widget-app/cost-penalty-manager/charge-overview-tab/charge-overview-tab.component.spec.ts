import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeOverviewTabComponent } from './charge-overview-tab.component';

describe('ChargeOverviewTabComponent', () => {
  let component: ChargeOverviewTabComponent;
  let fixture: ComponentFixture<ChargeOverviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeOverviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
