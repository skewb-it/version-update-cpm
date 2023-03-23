import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationListingComponent } from './organisation-listing.component';

describe('OrganisationListingComponent', () => {
  let component: OrganisationListingComponent;
  let fixture: ComponentFixture<OrganisationListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
