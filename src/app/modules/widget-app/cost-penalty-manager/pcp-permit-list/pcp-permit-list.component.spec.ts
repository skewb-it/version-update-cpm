import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpPermitListComponent } from './pcp-permit-list.component';

describe('PcpPermitListComponent', () => {
  let component: PcpPermitListComponent;
  let fixture: ComponentFixture<PcpPermitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpPermitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpPermitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
