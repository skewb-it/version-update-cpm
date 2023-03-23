import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitOverviewTabComponent } from './permit-overview-tab.component';

describe('PermitOverviewTabComponent', () => {
  let component: PermitOverviewTabComponent;
  let fixture: ComponentFixture<PermitOverviewTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitOverviewTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitOverviewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
