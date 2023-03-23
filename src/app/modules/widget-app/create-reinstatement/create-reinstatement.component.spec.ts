import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReinstatementComponent } from './create-reinstatement.component';

describe('CreateReinstatementComponent', () => {
  let component: CreateReinstatementComponent;
  let fixture: ComponentFixture<CreateReinstatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReinstatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReinstatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
