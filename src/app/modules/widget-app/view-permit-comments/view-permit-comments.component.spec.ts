import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermitCommentsComponent } from './view-permit-comments.component';

describe('ViewPermitCommentsComponent', () => {
  let component: ViewPermitCommentsComponent;
  let fixture: ComponentFixture<ViewPermitCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPermitCommentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermitCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
