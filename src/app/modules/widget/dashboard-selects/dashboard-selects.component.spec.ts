import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSelectsComponent } from './dashboard-selects.component';

describe('DashboardSelectsComponent', () => {
  let component: DashboardSelectsComponent;
  let fixture: ComponentFixture<DashboardSelectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSelectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSelectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
