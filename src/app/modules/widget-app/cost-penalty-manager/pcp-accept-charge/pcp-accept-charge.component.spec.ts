import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpAcceptChargeComponent } from './pcp-accept-charge.component';

describe('PcpAcceptChargeComponent', () => {
  let component: PcpAcceptChargeComponent;
  let fixture: ComponentFixture<PcpAcceptChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpAcceptChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpAcceptChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
