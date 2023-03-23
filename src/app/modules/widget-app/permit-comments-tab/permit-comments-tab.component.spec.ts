import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitCommentsTabComponent } from './permit-comments-tab.component';

describe('PermitCommentsTabComponent', () => {
  let component: PermitCommentsTabComponent;
  let fixture: ComponentFixture<PermitCommentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermitCommentsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitCommentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
