import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AttendanceForChild } from 'src/app/models/AttendanceForChild';
import { AttendanceService } from 'src/app/Services/attendance.service';

@Component({
  selector: 'app-child-attendance',
  templateUrl: './child-attendance.component.html',
  styleUrls: ['./child-attendance.component.css']
})
export class ChildAttendanceComponent {
  childAttendance: AttendanceForChild[] = [];constructor(private attendanceService: AttendanceService , private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getChildAttendanceForParent();
  }
  getChildAttendanceForParent(): void {
    this.attendanceService.getChildAttendanceForParent().subscribe(
      (data) => {
        this.childAttendance = data;
        this.toastr.success('Reterived Successfully','',{
          positionClass: 'toast-bottom-right'})  
      },
      (error) => {
        console.error('Error fetching child attendance:', error);
        this.toastr.error('Something Wont Wrong!!')
      }
    );
  }

}
