import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpManageActionsComponent } from './pcp-manage-actions.component';

describe('PcpManageActionsComponent', () => {
  let component: PcpManageActionsComponent;
  let fixture: ComponentFixture<PcpManageActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpManageActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpManageActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
