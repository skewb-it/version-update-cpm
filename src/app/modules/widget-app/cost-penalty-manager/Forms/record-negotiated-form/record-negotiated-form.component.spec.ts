import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordNegotiatedFormComponent } from './record-negotiated-form.component';

describe('RecordNegotiatedFormComponent', () => {
  let component: RecordNegotiatedFormComponent;
  let fixture: ComponentFixture<RecordNegotiatedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordNegotiatedFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordNegotiatedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
