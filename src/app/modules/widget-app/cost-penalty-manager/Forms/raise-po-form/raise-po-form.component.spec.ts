import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisePoFormComponent } from './raise-po-form.component';

describe('RaisePoFormComponent', () => {
  let component: RaisePoFormComponent;
  let fixture: ComponentFixture<RaisePoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisePoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisePoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
