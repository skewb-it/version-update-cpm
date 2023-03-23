import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitMapDesignationTabComponent } from './permit-map-designation-tab.component';

describe('PermitMapDesignationTabComponent', () => {
  let component: PermitMapDesignationTabComponent;
  let fixture: ComponentFixture<PermitMapDesignationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitMapDesignationTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitMapDesignationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
