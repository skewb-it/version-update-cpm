import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpImagesAndFilesComponent } from './pcp-images-and-files.component';

describe('PcpImagesAndFilesComponent', () => {
  let component: PcpImagesAndFilesComponent;
  let fixture: ComponentFixture<PcpImagesAndFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpImagesAndFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpImagesAndFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
