import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbaordContainerComponent } from './dashbaord-container.component';

describe('DashbaordContainerComponent', () => {
  let component: DashbaordContainerComponent;
  let fixture: ComponentFixture<DashbaordContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbaordContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbaordContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
