import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitReinstatementTabComponent } from './permit-reinstatement-tab.component';

describe('PermitReinstatementTabComponent', () => {
  let component: PermitReinstatementTabComponent;
  let fixture: ComponentFixture<PermitReinstatementTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitReinstatementTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitReinstatementTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
