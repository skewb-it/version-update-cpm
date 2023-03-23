import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpChargeHistoryComponent } from './pcp-charge-history.component';

describe('PcpChargeHistoryComponent', () => {
  let component: PcpChargeHistoryComponent;
  let fixture: ComponentFixture<PcpChargeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpChargeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpChargeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
