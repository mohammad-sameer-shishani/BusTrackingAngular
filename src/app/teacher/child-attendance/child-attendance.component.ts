import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/Services/attendance.service';

@Component({
  selector: 'app-child-attendance',
  templateUrl: './child-attendance.component.html',
  styleUrls: ['./child-attendance.component.css']
})
export class ChildAttendanceComponent implements OnInit {



  updateAttendanceForm = new FormGroup({
    Status : new FormControl()
  })
  
  @ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
  @ViewChild('updateDailog') callupdateDailog!:TemplateRef<any>; 
  UData:any ; 


constructor(public attendance:AttendanceService ,public dialog: MatDialog, private route: ActivatedRoute){}
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

openDeleteDailog(attendanceId: number): void {
  const dialogResult = this.dialog.open(this.callDeleteDailog);
  dialogResult.afterClosed().subscribe((result) => {
    if (result === 'yes') {
      this.attendance.DeleteAttendance(attendanceId);
    } else {
      console.log('Delete operation canceled.');
    }
  });
}

openUpdateDialog(attendance: any): void {
  console.log('Attendance object:', attendance); // Log the entire object

  if (!attendance || !attendance.attendanceid) {  // Change Attendanceid to attendanceid
    console.error('Attendance object is missing or does not have a valid attendanceid:', attendance);
    return;
  }

  this.dialog.open(this.callupdateDailog);
  this.UData = attendance;

  console.log('UData after assignment:', this.UData);

  this.updateAttendanceForm.patchValue({
    Status: this.UData.status // Ensure that this matches the case of your object properties
  });
}



update(attendanceId: number): void {
  console.log('Updating attendance with ID:', attendanceId); // Log the ID being passed
  if (!attendanceId) {
    console.error('Invalid attendance ID:', attendanceId);
    return;
  }

  if (this.updateAttendanceForm.valid) {
    this.attendance.UpdateAttendance(attendanceId, this.updateAttendanceForm.value)
  } else {
    console.error('Form is invalid');
  }
}






}
