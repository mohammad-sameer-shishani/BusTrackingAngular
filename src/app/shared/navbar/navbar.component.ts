import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ContentService } from 'src/app/Services/content.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userRole: number | null = null; // Variable to hold the user role
  user: any;
  isAuthenticated: boolean = false; // Explicitly setting the type to boolean

  constructor(private auth: AuthService, private router: Router, public content: ContentService) {}

  ngOnInit(): void {
    this.isAuthenticated = !!localStorage.getItem('token'); // Set to true if token exists

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.userRole = this.user.RoleId;
      console.log('User Role set:', this.userRole);
    } else {
      console.error('No user found in local storage.');
      this.userRole = null; // Set to null if no user is found
    }
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']); // Redirect to login or home after logout
  }

  navigateToDashboard(): void {
 
    if (this.userRole === 1) {
      this.router.navigate(['/admin']);
    } else if (this.userRole === 2) {
      this.router.navigate(['/teacher']);
    } else if (this.userRole === 3) {
      this.router.navigate(['/parent']);
    } else if (this.userRole === 4) {
      this.router.navigate(['/driver']);
    } else {
      this.router.navigate(['/']);
    }
}
}
