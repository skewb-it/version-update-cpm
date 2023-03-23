import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpFilterComponent } from './pcp-filter.component';

describe('PcpFilterComponent', () => {
  let component: PcpFilterComponent;
  let fixture: ComponentFixture<PcpFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
