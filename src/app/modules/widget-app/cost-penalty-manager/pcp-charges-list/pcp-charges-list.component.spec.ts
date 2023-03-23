import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpChargesListComponent } from './pcp-charges-list.component';

describe('PcpChargesListComponent', () => {
  let component: PcpChargesListComponent;
  let fixture: ComponentFixture<PcpChargesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpChargesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpChargesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
