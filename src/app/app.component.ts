import { Component, OnInit } from '@angular/core';
import { ChildService } from './Services/child.service';
import { HomeService } from './Services/home.service';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
 
  title = 'BusTracking';
  test:any;
constructor (private spinner : NgxSpinnerService){}
  ngOnInit(): void {
    this.spinner.show();
    setTimeout (()=>{this.spinner.hide();},1000)

  }


  
}
