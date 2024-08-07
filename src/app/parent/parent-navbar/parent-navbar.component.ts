import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parent-navbar',
  templateUrl: './parent-navbar.component.html',
  styleUrls: ['./parent-navbar.component.css']
})
export class ParentNavbarComponent {
  constructor(private router:Router){}
  logout(){
    localStorage.clear();
    this.router.navigate(['account/login'])
  }
}
