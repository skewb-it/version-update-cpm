import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitViewComponent } from './permit-view.component';

describe('PermitViewComponent', () => {
  let component: PermitViewComponent;
  let fixture: ComponentFixture<PermitViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
