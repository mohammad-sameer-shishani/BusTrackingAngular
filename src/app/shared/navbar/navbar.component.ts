import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ContentService } from 'src/app/Services/content.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private auth:AuthService,private router:Router,public content:ContentService){}
  isAuthenticated:any;
  ngOnInit(): void {
    this.isAuthenticated=localStorage.getItem('token');

  }
  logout(){
    this.auth.logout();
  }

}
