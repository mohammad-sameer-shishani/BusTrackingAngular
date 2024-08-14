import { Component, OnInit } from '@angular/core';
import { ArrivalService } from 'src/app/Services/arrival.service';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { ChildService } from 'src/app/Services/child.service';
import { NotificationService } from 'src/app/Services/notification.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-trip-children',
  templateUrl: './trip-children.component.html',
  styleUrls: ['./trip-children.component.css']
})
export class TripChildrenComponent implements OnInit{
  constructor(
    private teacher:UsersService,
    private arrival:ArrivalService,
    public child:ChildService,
    public attendanceService:AttendanceService,
    private notificationService: NotificationService){}

  searchText: string = '';  
  teacherid:any
  children:any=[]
  public notifications: string[] = [];

  ngOnInit(): void {
    this.teacherid=this.teacher.GetMyId();
    this.loadChildren()
    this.notifications = this.notificationService.getNotifications();
     }
   
    ChildArrived(childid:number,teacherid:number){
      var status = "arrived";
      var body = {
          childid: childid,
          teacherid: teacherid,
          status: status
      };
      this.arrival.AddArrival(body);
    }
  
    loadChildren(): void {
      this.attendanceService.getBusWithChildrenByTeacherId().subscribe(data => {
        console.log('Children data:', data); // Debugging line
        this.children = data;
      });
    }
   
  sendNotification(child:any): void {
    var body={
      teacherid:this.teacher.GetMyId(),
      parentid:child.parentid,
      message:`${child.firstname} Has Arrived To Home`
    }
    this.notificationService.sendNotification(child.firstname+' Has Arrived At '+Date.now);
    this.notificationService.CreateNotification(body)
  }
}
