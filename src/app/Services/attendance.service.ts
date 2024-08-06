import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AttendanceChildrenBus } from '../models/AttendanceChildrenBus';
import { Observable } from 'rxjs';
import { AttendanceSubmission } from '../models/AttendanceSubmission';
import { AttendanceForChild } from '../models/AttendanceForChild';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'https://localhost:7169/api/Attendance';
  user2: any; // Define user2 as an object
  teacherId: number;

  constructor(private http: HttpClient, 
              private spinner: NgxSpinnerService, 
              private toastr: ToastrService) {
    
    // Retrieve the user from local storage and parse it to an object
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user2 = JSON.parse(storedUser);
      this.teacherId = this.user2.UserId; // Now teacherId can be accessed correctly
    } else {
      console.error('No user found in local storage.');
      this.teacherId = 0; // Handle this case as needed
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
}
