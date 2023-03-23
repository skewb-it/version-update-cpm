import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueListWidgetComponent } from './due-list-widget.component';

describe('DueListWidgetComponent', () => {
  let component: DueListWidgetComponent;
  let fixture: ComponentFixture<DueListWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueListWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DueListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
