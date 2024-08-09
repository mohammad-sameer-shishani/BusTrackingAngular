import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AttendanceChildrenBus } from '../models/AttendanceChildrenBus';
import { finalize, Observable } from 'rxjs';
import { AttendanceSubmission } from '../models/AttendanceSubmission';
import { AttendanceForChild } from '../models/AttendanceForChild';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://localhost:7169/api/Attendance';
  user2: any; // Define user2 as an object
  teacherId: number;
  parentId : number;


  constructor(private http: HttpClient, 
              private spinner: NgxSpinnerService, 
              private toastr: ToastrService) {
    
    // Retrieve the user from local storage and parse it to an object
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user2 = JSON.parse(storedUser);
      this.teacherId = this.user2.UserId; // Now teacherId can be accessed correctly
      this.parentId= this.user2.UserId
    } else {
      console.error('No user found in local storage.');
      this.teacherId = 0; // Handle this case as needed
      this.parentId = 0;
    }
  }

  createAttendance(submission: AttendanceSubmission): Observable<any> {
    return this.http.post(`${this.apiUrl}`, submission);
  }

  getAttendanceForChild(childId: number): Observable<AttendanceForChild[]> {
    return this.http.get<AttendanceForChild[]>(`${this.apiUrl}/GetAttendanceForChild/${childId}`);
  }

  getBusWithChildrenByTeacherId(): Observable<AttendanceChildrenBus[]> {
    return this.http.get<AttendanceChildrenBus[]>(`${this.apiUrl}/GetBusWithChildrenByTeacherId/${this.teacherId}`);
  }






  DeleteAttendance(attendanceId : number){
    debugger;
    this.spinner.show();
    this.http.delete('https://localhost:7169/api/Attendance/'+attendanceId).subscribe((res)=>{
      window.location.reload();
      this.toastr.success('Successfully Deleted','',{
        positionClass: 'toast-bottom-right'})
    },err=>{
      console.log("Error");
      this.toastr.error('Something Wont Wrong!!')
  })
  this.spinner.hide();
  }


  UpdateAttendance(attendanceId : number ,body:any){
    this.spinner.show();
    this.http.put('https://localhost:7169/api/Attendance/'+attendanceId, body).subscribe((res)=>{
      console.log('Attendance Updated');
      window.location.reload();
      this.toastr.success('Successfully Updated')
    },err=>{
      console.log('error');
      this.toastr.error('Something Wont Wrong!!')
    })
    this.spinner.hide();
  }

  getChildAttendanceForParent(): Observable<AttendanceForChild[]> { 
    this.spinner.show();
    return this.http.get<AttendanceForChild[]>(`${this.apiUrl}/GetChildAttendanceForParent/${this.parentId}`).pipe(
        finalize(() => this.spinner.hide()) // This ensures the spinner is hidden once the HTTP request is complete.
    );
}

}
