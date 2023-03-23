import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixA4Component } from './matrix-a4.component';

describe('MatrixA4Component', () => {
  let component: MatrixA4Component;
  let fixture: ComponentFixture<MatrixA4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixA4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixA4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
