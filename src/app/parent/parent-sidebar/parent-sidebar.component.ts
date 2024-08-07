import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-parent-sidebar',
  templateUrl: './parent-sidebar.component.html',
  styleUrls: ['./parent-sidebar.component.css']
})
export class ParentSidebarComponent {
  constructor(private auth:AuthService,private router:Router){}
  isAuthenticated:any;
  ngOnInit(): void {
    this.isAuthenticated=localStorage.getItem('token');
  }
  logout(){
    this.auth.logout();
  }
}
