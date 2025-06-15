import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionDetailComponent } from './position-detail.component';

describe('PositionDetailComponent', () => {
  let component: PositionDetailComponent;
  let fixture: ComponentFixture<PositionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PositionDetailComponent]
    });
    fixture = TestBed.createComponent(PositionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
