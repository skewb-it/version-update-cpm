import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitImagesAndFilesTabComponent } from './permit-images-and-files-tab.component';

describe('PermitImagesAndFilesTabComponent', () => {
  let component: PermitImagesAndFilesTabComponent;
  let fixture: ComponentFixture<PermitImagesAndFilesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitImagesAndFilesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitImagesAndFilesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
