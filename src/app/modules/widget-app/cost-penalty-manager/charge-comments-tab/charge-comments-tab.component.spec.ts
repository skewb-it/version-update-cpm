import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeCommentsTabComponent } from './charge-comments-tab.component';

describe('ChargeCommentsTabComponent', () => {
  let component: ChargeCommentsTabComponent;
  let fixture: ComponentFixture<ChargeCommentsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeCommentsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeCommentsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
