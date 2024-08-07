import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentNavbarComponent } from './parent-navbar.component';

describe('ParentNavbarComponent', () => {
  let component: ParentNavbarComponent;
  let fixture: ComponentFixture<ParentNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentNavbarComponent]
    });
    fixture = TestBed.createComponent(ParentNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
