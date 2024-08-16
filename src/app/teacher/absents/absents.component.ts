import { Component, OnInit } from '@angular/core';
import { AttendanceChildrenBus } from 'src/app/models/AttendanceChildrenBus';
import { AttendanceSubmission } from 'src/app/models/AttendanceSubmission';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-absents',
  templateUrl: './absents.component.html',
  styleUrls: ['./absents.component.css']
})
export class AbsentsComponent implements OnInit{
  children: AttendanceChildrenBus[] = [];
  teacherId: number;
  user2: any;
  
  constructor(private attendanceService: AttendanceService) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user2 = JSON.parse(storedUser);
      this.teacherId = this.user2.UserId; // Now teacherId can be accessed correctly
    } else {
      console.error('No user found in local storage.');
      this.teacherId = 0; // Handle this case as needed
    }
  }

  ngOnInit(): void {
    this.loadChildren();
  }

  loadChildren(): void {
    this.attendanceService.getBusWithChildrenByTeacherId().subscribe(data => {
      console.log('Children data:', data); // Debugging line
      this.children = data;
    });
  }

  submitAttendance(): void {
    console.log('Submitting attendance with teacherId:', this.teacherId);
    console.log('Children data:', this.children);
    
    const submission: AttendanceSubmission = {
      teacherid: this.teacherId,  // Ensure this is correctly populated
      attendances: this.children.map(child => ({
        childid: child.childid,
        status: (document.getElementById(`child-${child.childid}`) as HTMLInputElement).checked ? 'Present' : 'Absent'
      }))
    };
    
    console.log('Attendance submission:', submission);
    
    this.attendanceService.createAttendance(submission).subscribe(
      response => {
        console.log('Response received:', response);
        alert('Attendance submitted successfully');
        window.location.reload()
      },
      error => {
        console.error('There was an error!', error);
        alert('Failed to submit attendance.');
      }
    );
  }
  
  
  
}
