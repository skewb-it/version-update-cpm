import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBulkuploadDataComponent } from './view-bulkupload-data.component';

describe('ViewBulkuploadDataComponent', () => {
  let component: ViewBulkuploadDataComponent;
  let fixture: ComponentFixture<ViewBulkuploadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBulkuploadDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBulkuploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
