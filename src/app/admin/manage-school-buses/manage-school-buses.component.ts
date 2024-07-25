import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-school-buses',
  templateUrl: './manage-school-buses.component.html',
  styleUrls: ['./manage-school-buses.component.css']
})
export class ManageSchoolBusesComponent implements OnInit{

  constructor(public home:HomeService){}
  ngOnInit(): void {
    this.home.getAllBuses();
  }
  

}
