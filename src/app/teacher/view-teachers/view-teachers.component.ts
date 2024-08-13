import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-view-teachers',
  templateUrl: './view-teachers.component.html',
  styleUrls: ['./view-teachers.component.css']
})
export class ViewTeachersComponent implements OnInit{
  constructor(public teacher:UsersService){}
  myid:any
  ngOnInit(): void {
    this.myid=this.teacher.GetMyId()
    this.teacher.getAllTeachers()
  }

}
