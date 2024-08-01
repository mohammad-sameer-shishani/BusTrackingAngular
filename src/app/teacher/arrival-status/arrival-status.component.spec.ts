import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivalStatusComponent } from './arrival-status.component';

describe('ArrivalStatusComponent', () => {
  let component: ArrivalStatusComponent;
  let fixture: ComponentFixture<ArrivalStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArrivalStatusComponent]
    });
    fixture = TestBed.createComponent(ArrivalStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
