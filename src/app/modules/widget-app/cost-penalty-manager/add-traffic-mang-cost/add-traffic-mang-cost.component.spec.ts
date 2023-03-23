import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrafficMangCostComponent } from './add-traffic-mang-cost.component';

describe('AddTrafficMangCostComponent', () => {
  let component: AddTrafficMangCostComponent;
  let fixture: ComponentFixture<AddTrafficMangCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrafficMangCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrafficMangCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
