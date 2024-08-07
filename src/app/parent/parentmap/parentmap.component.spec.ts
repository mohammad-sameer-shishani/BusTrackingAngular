import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentmapComponent } from './parentmap.component';

describe('ParentmapComponent', () => {
  let component: ParentmapComponent;
  let fixture: ComponentFixture<ParentmapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentmapComponent]
    });
    fixture = TestBed.createComponent(ParentmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
