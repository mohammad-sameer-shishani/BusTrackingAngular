import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { jsPDF } from 'jspdf'; 
import html2canvas from 'html2canvas';

import { catchError, finalize, Observable, tap } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class UserStatisticsService {

  constructor(
    private http: HttpClient, 
    private spinner: NgxSpinnerService, 
    private toastr: ToastrService
  ) { } 

  users: any[] = [];

  getUsersByYear(year: number) {
    this.spinner.show();
    this.http.get(`https://localhost:7169/api/UserStatistics/year/${year}`).subscribe(
      (res: any) => {
        this.users = res;
       
      },
      err => {
        console.error("Error retrieving users by year", err);
        this.toastr.error('Something Went Wrong!!');
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  getUsersByMonthAndYear(year: number, month: number) {
    this.spinner.show();
    this.http.get(`https://localhost:7169/api/UserStatistics/year/${year}/month/${month}`).subscribe(
      (res: any) => {
        this.users = res;
       
      },
      err => {
        console.error("Error retrieving users by month and year", err);
        this.toastr.error('Something Went Wrong!!');
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  getUserById(userId: number) {
    this.spinner.show();
    this.http.get(`https://localhost:7169/api/UserStatistics/${userId}`).subscribe(
      (res: any) => {
        console.log("User retrieved successfully");
        this.toastr.success('Retrieved Successfully', '', {
          positionClass: 'toast-bottom-right'
        });
      },
      err => {
        console.error("Error retrieving user by ID", err);
        this.toastr.error('Something Went Wrong!!');
      },
      () => {
        this.spinner.hide();
      }
    );
  }
  getTeacherStudentCounts(): Observable<{ teacherCount: number, studentCount: number, driverCount: number, parentCount: number }> {
    this.spinner.show();
    return this.http.get<{ teacherCount: number, studentCount: number, driverCount: number, parentCount: number }>(`https://localhost:7169/api/UserStatistics/teacher-student-counts`).pipe(
      tap(res => {
        console.log('Statistics retrieved successfully:', res);
        this.toastr.success('Statistics Retrieved Successfully', '', {
          positionClass: 'toast-bottom-right'
        });
      }),
      catchError(err => {
        console.error('Error retrieving statistics:', err);
        this.toastr.error('Something Went Wrong!!');
        throw err;  // Re-throw the error to propagate it to the component
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }


  exportAsPDF(elementId: string, fileName: string): void {
    const data = document.getElementById(elementId);
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save(`${fileName}.pdf`);
      });
    }
  }






}
