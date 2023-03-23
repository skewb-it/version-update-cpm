import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermitCostListComponent } from './edit-permit-cost-list.component';

describe('EditPermitCostListComponent', () => {
  let component: EditPermitCostListComponent;
  let fixture: ComponentFixture<EditPermitCostListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPermitCostListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermitCostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
