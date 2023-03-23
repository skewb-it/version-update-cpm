import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpQuickFilterComponent } from './pcp-quick-filter.component';

describe('PcpQuickFilterComponent', () => {
  let component: PcpQuickFilterComponent;
  let fixture: ComponentFixture<PcpQuickFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpQuickFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpQuickFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
