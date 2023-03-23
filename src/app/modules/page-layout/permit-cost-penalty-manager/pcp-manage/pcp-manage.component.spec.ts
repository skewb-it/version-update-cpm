import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcpManageComponent } from './pcp-manage.component';

describe('PcpManageComponent', () => {
  let component: PcpManageComponent;
  let fixture: ComponentFixture<PcpManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcpManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PcpManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
