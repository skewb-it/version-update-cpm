import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixA2Component } from './matrix-a2.component';

describe('MatrixA2Component', () => {
  let component: MatrixA2Component;
  let fixture: ComponentFixture<MatrixA2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixA2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixA2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
