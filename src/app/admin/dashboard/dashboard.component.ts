import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/Services/bus.service';
import { ChildService } from 'src/app/Services/child.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  
  constructor(public home:HomeService,public child:ChildService,public bus:BusService){}
  countBuses: number = 0;
  countTeachers:any;
  countParents:any;
  countDrivers:any;
  countChildren:any;

  ngOnInit(): void {
    console.log(this.countBuses);
    this.bus.getAllBuses()
    this.home.getAllDrivers();
    this.home.getAllParents();
    this.home.getAllTeachers();
    // this.countBuses=this.home.AllBuses.length;
    this.countChildren=this.child.allChildren.length;
    this.countDrivers=this.home.AllDrivers.length;
    this.countParents=this.home.AllParents.length;
    this.countTeachers=this.home.AllTeachers.length;
  }

}
