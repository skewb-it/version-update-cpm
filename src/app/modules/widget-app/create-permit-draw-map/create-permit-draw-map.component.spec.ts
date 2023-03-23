import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePermitDrawMapComponent } from './create-permit-draw-map.component';

describe('CreatePermitDrawMapComponent', () => {
  let component: CreatePermitDrawMapComponent;
  let fixture: ComponentFixture<CreatePermitDrawMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePermitDrawMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePermitDrawMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
