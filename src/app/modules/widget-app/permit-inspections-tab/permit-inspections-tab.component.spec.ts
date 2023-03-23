import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitInspectionsTabComponent } from './permit-inspections-tab.component';

describe('PermitInspectionsTabComponent', () => {
  let component: PermitInspectionsTabComponent;
  let fixture: ComponentFixture<PermitInspectionsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitInspectionsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitInspectionsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
