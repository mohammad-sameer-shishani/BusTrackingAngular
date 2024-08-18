import { Component, OnInit } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
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
    private notificationService: NotificationService,
    private router : Router){}

  searchText: string = '';  
  teacherid:any
  children:any=[]
  notifications: string[] = [];
  

  ngOnInit(): void {
    this.teacherid=this.teacher.GetMyId();
    this.loadChildren()
    this.notifications = this.notificationService.getNotifications();
     }
   
     Arrived(Child:any){
      this.ChildArrived(Child.childid,this.teacherid);
      this.sendNotification(Child);
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
    ViewAllAttendance(childid : number){
      console.log('Navigating to child attendance for child ID:', childid); // Debugging line
      this.router.navigate(['/teacher/childattendance', childid]);
    }
    
    ViewAllArrival(childid : number){
      console.log('Navigating to child arrivals for child ID:', childid); // Debugging line
      this.router.navigate(['/teacher/childarrivals', childid]);
    }

  sendNotification(child:any): void {
    var body={
      teacherid:this.teacher.GetMyId(),
      parentid:child.parentid,
      message:`${child.firstname} Has Arrived To Home`
    }
    this.notificationService.sendNotification(child.firstname+' Has Arrived  ');
    this.notificationService.CreateNotification(body)
  }
}
