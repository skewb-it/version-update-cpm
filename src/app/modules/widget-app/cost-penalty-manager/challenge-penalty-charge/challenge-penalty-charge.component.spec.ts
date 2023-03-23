import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengePenaltyChargeComponent } from './challenge-penalty-charge.component';

describe('ChallengePenaltyChargeComponent', () => {
  let component: ChallengePenaltyChargeComponent;
  let fixture: ComponentFixture<ChallengePenaltyChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengePenaltyChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengePenaltyChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
