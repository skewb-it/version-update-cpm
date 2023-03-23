import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeFileAttachmentsTabComponent } from './charge-file-attachments-tab.component';

describe('ChargeFileAttachmentsTabComponent', () => {
  let component: ChargeFileAttachmentsTabComponent;
  let fixture: ComponentFixture<ChargeFileAttachmentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeFileAttachmentsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeFileAttachmentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
