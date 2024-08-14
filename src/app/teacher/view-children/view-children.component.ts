import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { ChildService } from 'src/app/Services/child.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-view-children',
  templateUrl: './view-children.component.html',
  styleUrls: ['./view-children.component.css']
})
export class ViewChildrenComponent implements OnInit{
  children:any=[]
constructor(public child :ChildService, private router : Router,public attendanceService:AttendanceService,public teacher:UsersService){}
searchText: string = '';  
teacherid:any
ngOnInit(): void {
    this.teacherid=this.teacher.GetMyId();
    this.loadChildren()
  }
  ViewAllAttendance(childid : number){
    console.log('Navigating to child attendance for child ID:', childid); // Debugging line
    this.router.navigate(['/teacher/childattendance', childid]);
  }



  loadChildren(): void {
    this.attendanceService.getBusWithChildrenByTeacherId().subscribe(data => {
      console.log('Children data:', data); // Debugging line
      this.children = data;
    });
  }



}
