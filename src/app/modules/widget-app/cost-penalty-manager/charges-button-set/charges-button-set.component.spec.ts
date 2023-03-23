import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesButtonSetComponent } from './charges-button-set.component';

describe('ChargesButtonSetComponent', () => {
  let component: ChargesButtonSetComponent;
  let fixture: ComponentFixture<ChargesButtonSetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargesButtonSetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesButtonSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
