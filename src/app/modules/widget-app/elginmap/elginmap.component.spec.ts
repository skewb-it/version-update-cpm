import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElginmapComponent } from './elginmap.component';

describe('ElginmapComponent', () => {
  let component: ElginmapComponent;
  let fixture: ComponentFixture<ElginmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElginmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElginmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
