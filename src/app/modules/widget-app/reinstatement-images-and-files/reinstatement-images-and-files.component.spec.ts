import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinstatementImagesAndFilesComponent } from './reinstatement-images-and-files.component';

describe('ReinstatementImagesAndFilesComponent', () => {
  let component: ReinstatementImagesAndFilesComponent;
  let fixture: ComponentFixture<ReinstatementImagesAndFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReinstatementImagesAndFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinstatementImagesAndFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
