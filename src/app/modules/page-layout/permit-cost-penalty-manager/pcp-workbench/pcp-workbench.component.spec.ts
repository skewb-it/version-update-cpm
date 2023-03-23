import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpWorkbenchComponent } from './pcp-workbench.component';

describe('PcpWorkbenchComponent', () => {
  let component: PcpWorkbenchComponent;
  let fixture: ComponentFixture<PcpWorkbenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpWorkbenchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpWorkbenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
