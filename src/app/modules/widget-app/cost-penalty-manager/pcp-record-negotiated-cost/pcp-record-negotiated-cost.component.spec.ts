import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpRecordNegotiatedCostComponent } from './pcp-record-negotiated-cost.component';

describe('PcpRecordNegotiatedCostComponent', () => {
  let component: PcpRecordNegotiatedCostComponent;
  let fixture: ComponentFixture<PcpRecordNegotiatedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpRecordNegotiatedCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpRecordNegotiatedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
