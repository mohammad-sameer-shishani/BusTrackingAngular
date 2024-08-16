import { Component } from '@angular/core';
import { UserStatisticsService } from 'src/app/Services/user-statistics.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent {
  users: any[] = [];
  year: number | null = null;  // Initialize as null to capture empty input
  month: number | null = null; // Initialize as null to capture empty input
  errorMessage: string = ''; // Initialize errorMessage
  searchMonth:string =''
  searchYear:string =''


  constructor(public report: UserStatisticsService) { }

  loadUsersByYear() {
    if (this.year && this.year > 0) {
      this.report.getUsersByYear(this.year);
      this.users = this.report.users || [];
      this.errorMessage = ''; // Clear error message if any
    } else {
      this.errorMessage = 'Please enter a valid year';
      console.error('Please enter a valid year');
    }
  }

  loadUsersByMonthAndYear() {
    if (this.year && this.year > 0 && this.month && this.month >= 1 && this.month <= 12) {
      this.report.getUsersByMonthAndYear(this.year, this.month);
      this.users = this.report.users || [];
      this.errorMessage = ''; // Clear error message if any
    } else {
      if (!this.year || this.year <= 0) {
        this.errorMessage = 'Please enter a valid year';
        console.error('Please enter a valid year');
      } else if (!this.month || this.month < 1 || this.month > 12) {
        this.errorMessage = 'Please enter a valid month (1-12)';
        console.error('Please enter a valid month (1-12)');
      }
    }
  }
  
   
  downloadReportAsPDF() {
    if (this.users.length > 0) {
      this.report.exportAsPDF('user-report-table', 'UserReport');
      this.errorMessage = ''; // Clear error message if any
    } else {
      this.errorMessage = 'No data available to download';
      console.error('No data available to download');
    }
  }
  

}
