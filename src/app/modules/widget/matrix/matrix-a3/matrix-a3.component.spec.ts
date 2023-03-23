import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixA3Component } from './matrix-a3.component';

describe('MatrixA3Component', () => {
  let component: MatrixA3Component;
  let fixture: ComponentFixture<MatrixA3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatrixA3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatrixA3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
