import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordWriteOffComponent } from './record-write-off.component';

describe('RecordWriteOffComponent', () => {
  let component: RecordWriteOffComponent;
  let fixture: ComponentFixture<RecordWriteOffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordWriteOffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordWriteOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
