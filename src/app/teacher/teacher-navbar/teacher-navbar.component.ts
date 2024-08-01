import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css']
})
export class TeacherNavbarComponent {
  constructor(private router:Router){}
  logout(){
    localStorage.clear();
    this.router.navigate(['account/login'])
  }
}
