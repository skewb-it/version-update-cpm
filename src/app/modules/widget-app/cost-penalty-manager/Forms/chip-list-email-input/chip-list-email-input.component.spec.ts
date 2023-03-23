import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipListEmailInputComponent } from './chip-list-email-input.component';

describe('ChipListEmailInputComponent', () => {
  let component: ChipListEmailInputComponent;
  let fixture: ComponentFixture<ChipListEmailInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipListEmailInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipListEmailInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
