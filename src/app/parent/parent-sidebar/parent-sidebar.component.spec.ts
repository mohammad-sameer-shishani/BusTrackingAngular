import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentSidebarComponent } from './parent-sidebar.component';

describe('ParentSidebarComponent', () => {
  let component: ParentSidebarComponent;
  let fixture: ComponentFixture<ParentSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentSidebarComponent]
    });
    fixture = TestBed.createComponent(ParentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
