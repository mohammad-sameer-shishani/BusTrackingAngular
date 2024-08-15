import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Services/notification.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit{
constructor(public notify:NotificationService,private parent:UsersService){}
  ngOnInit(): void {
    this.notify.GetAllNotificationByParentId(this.parent.GetMyId())
  }

  deleteNotification(notificationid:number){
    this.notify.DeleteNotification(notificationid);
  }

}
