import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/Services/attendance.service';

@Component({
  selector: 'app-child-attendance',
  templateUrl: './child-attendance.component.html',
  styleUrls: ['./child-attendance.component.css']
})
export class ChildAttendanceComponent implements OnInit {
constructor(public attendance:AttendanceService , private route: ActivatedRoute){}
childAttendance: any[] = [];
childId!: number; // Using definite assignment assertion
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.childId = Number(params.get('childid'));
    if (this.childId) {
      this.getAttendance();
    }
  });
}



getAttendance(): void {
  this.attendance.getAttendanceForChild(this.childId).subscribe(
    (data) => {
      this.childAttendance = data;
      console.log('Child Attendance:', this.childAttendance);
    },
    (error) => {
      console.error('Error fetching attendance:', error);
    }
  );
}






}
