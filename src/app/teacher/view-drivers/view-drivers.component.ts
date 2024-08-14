import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-view-drivers',
  templateUrl: './view-drivers.component.html',
  styleUrls: ['./view-drivers.component.css']
})

export class ViewDriversComponent implements OnInit{
  public notifications: string[] = [];
  constructor(public driver:UsersService,  private notificationService: NotificationService){}
  ngOnInit(): void {
    
    this.driver.getAllDrivers()
    this.notifications = this.notificationService.getNotifications();
  }
  sendNotification(): void {
    this.notificationService.sendNotification('Hello from Abdullah');
  }
}

