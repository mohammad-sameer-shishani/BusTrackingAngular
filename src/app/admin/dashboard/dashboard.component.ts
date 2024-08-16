import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/Services/bus.service';
import { ChildService } from 'src/app/Services/child.service';
import { HomeService } from 'src/app/Services/home.service';
import { UserStatisticsService } from 'src/app/Services/user-statistics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  constructor(public home:HomeService,public child:ChildService,public bus:BusService, private userStatistics: UserStatisticsService){}
  countBuses: number = 0;
  countTeachers:any;
  countParents:any;
  countDrivers:any;
  countChildren:any;

  teacherCount: number =0 ;
  studentCount: number =0 ;
  driverCount: number = 0;
  parentCount: number = 0;
  errorMessage: string = '';

  ngOnInit(): void {
    console.log(this.countBuses);
    this.bus.getAllBuses()
    this.home.getAllDrivers();
    this.home.getAllParents();
    this.home.getAllTeachers();
    // this.countBuses=this.home.AllBuses.length;
    this.countChildren=this.child.allChildren.length;
    this.countDrivers=this.home.AllDrivers.length;
    this.countParents=this.home.AllParents.length;
    this.countTeachers=this.home.AllTeachers.length;
    this.loadStatistics();
    this.GetUserIdFromLocal();

  }
  GetUserIdFromLocal(){
    let user=localStorage.getItem("user");
    if (user) {
      // Parse the JSON string to an object
      let userObj = JSON.parse(user);
      let id=userObj.UserId;
  } else {
      console.log("No user found in localStorage");
  }
  }









  loadStatistics(): void {
    this.userStatistics.getTeacherStudentCounts().subscribe(
      (res: { teacherCount: number, studentCount: number, driverCount: number, parentCount: number }) => {
        this.teacherCount = res.teacherCount;
        this.studentCount = res.studentCount;
        this.driverCount = res.driverCount;
        this.parentCount = res.parentCount;
      },
      (error: any) => {
        console.error('Error loading statistics:', error);
        this.errorMessage = 'Failed to load statistics';
      }
    );
  }

  getTotal(): number {
    return this.teacherCount + this.studentCount+this.parentCount+this.driverCount;
  }

  getTeacherPercentage(): number {
    return this.getTotal() ? (this.teacherCount / this.getTotal()) * 100 : 0;
  }

  getStudentPercentage(): number {
    return this.getTotal() ? (this.studentCount / this.getTotal()) * 100 : 0;
  }
  getParentPercentage(): number {
    return this.getTotal() ? (this.parentCount / this.getTotal()) * 100 : 0;
  }

  getDriverPercentage(): number {
    return this.getTotal() ? (this.driverCount / this.getTotal()) * 100 : 0;
  }
}
