import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpAdvanceFilterComponent } from './pcp-advance-filter.component';

describe('PcpAdvanceFilterComponent', () => {
  let component: PcpAdvanceFilterComponent;
  let fixture: ComponentFixture<PcpAdvanceFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpAdvanceFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpAdvanceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
