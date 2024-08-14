import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-parent-sidebar',
  templateUrl: './parent-sidebar.component.html',
  styleUrls: ['./parent-sidebar.component.css']
})

export class ParentSidebarComponent {
  
  public notifications: string[] = [];
  constructor(private auth:AuthService,private router:Router,private notificationService: NotificationService){}
  isAuthenticated:any;
  ngOnInit(): void {
    this.isAuthenticated=localStorage.getItem('token');
    // this.notifications = this.notificationService.getNotifications();
  }
  logout(){
    this.auth.logout();
  }
}
