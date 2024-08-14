import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-parent-navbar',
  templateUrl: './parent-navbar.component.html',
  styleUrls: ['./parent-navbar.component.css']
})

export class ParentNavbarComponent {
  constructor(private router:Router,private notificationService: NotificationService){}
  
  logout(){
    localStorage.clear();
    this.router.navigate(['account/login'])
  }
}
