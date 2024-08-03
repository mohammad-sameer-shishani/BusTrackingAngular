import { Component } from '@angular/core';
import { UserStatisticsService } from 'src/app/Services/user-statistics.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  users: any[] = [];
  year: number = 0;  // Default value
  month: number = 0; // Default value
  errorMessage: string = ''; // Initialize errorMessage



  constructor(private report: UserStatisticsService) { }

  loadUsersByYear() {
    if (this.year !== undefined) {
      this.report.getUsersByYear(this.year);
      this.users = this.report.users || [];
    } else {
      console.error('Please enter a valid year');
    }
  }

  loadUsersByMonthAndYear() {
    if (this.year !== undefined && this.month !== undefined) {
      this.report.getUsersByMonthAndYear(this.year, this.month);
      this.users = this.report.users || [];
    } else {
      console.error('Please enter both a valid year and month');
    }
  }
  
  downloadReportAsPDF() {
    if (this.users.length > 0) {
      this.report.exportAsPDF('user-report-table', 'UserReport');
    } else {
      this.errorMessage = 'No data available to download';
    }
  }
  

}
