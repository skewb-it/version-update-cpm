import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpManagePrimaryDetailsComponent } from './pcp-manage-primary-details.component';

describe('PcpManagePrimaryDetailsComponent', () => {
  let component: PcpManagePrimaryDetailsComponent;
  let fixture: ComponentFixture<PcpManagePrimaryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpManagePrimaryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpManagePrimaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
