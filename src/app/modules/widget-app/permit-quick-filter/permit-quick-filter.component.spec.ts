import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitQuickFilterComponent } from './permit-quick-filter.component';

describe('PermitQuickFilterComponent', () => {
  let component: PermitQuickFilterComponent;
  let fixture: ComponentFixture<PermitQuickFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitQuickFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitQuickFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
