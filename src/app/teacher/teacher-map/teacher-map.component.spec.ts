import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMapComponent } from './teacher-map.component';

describe('TeacherMapComponent', () => {
  let component: TeacherMapComponent;
  let fixture: ComponentFixture<TeacherMapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeacherMapComponent]
    });
    fixture = TestBed.createComponent(TeacherMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
