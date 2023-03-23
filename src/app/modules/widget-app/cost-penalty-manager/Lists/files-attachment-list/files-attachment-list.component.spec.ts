import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesAttachmentListComponent } from './files-attachment-list.component';

describe('FilesAttachmentListComponent', () => {
  let component: FilesAttachmentListComponent;
  let fixture: ComponentFixture<FilesAttachmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesAttachmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesAttachmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
