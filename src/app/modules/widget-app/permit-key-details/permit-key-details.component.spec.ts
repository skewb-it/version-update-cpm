import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitKeyDetailsComponent } from './permit-key-details.component';

describe('PermitKeyDetailsComponent', () => {
  let component: PermitKeyDetailsComponent;
  let fixture: ComponentFixture<PermitKeyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitKeyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitKeyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
