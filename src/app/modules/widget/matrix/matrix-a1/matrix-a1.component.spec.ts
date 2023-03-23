import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixA1Component } from './matrix-a1.component';

describe('MatrixA1Component', () => {
  let component: MatrixA1Component;
  let fixture: ComponentFixture<MatrixA1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatrixA1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixA1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
