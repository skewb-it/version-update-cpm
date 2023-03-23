import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpEditPermitCostComponent } from './pcp-edit-permit-cost.component';

describe('PcpEditPermitCostComponent', () => {
  let component: PcpEditPermitCostComponent;
  let fixture: ComponentFixture<PcpEditPermitCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpEditPermitCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpEditPermitCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
