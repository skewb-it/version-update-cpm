import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkReportListComponent } from './work-report-list.component';

describe('WorkReportListComponent', () => {
  let component: WorkReportListComponent;
  let fixture: ComponentFixture<WorkReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
