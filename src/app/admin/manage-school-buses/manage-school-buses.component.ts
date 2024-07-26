import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-school-buses',
  templateUrl: './manage-school-buses.component.html',
  styleUrls: ['./manage-school-buses.component.css']
})
export class ManageSchoolBusesComponent implements OnInit{
  updateForm:FormGroup = new FormGroup({
    BusID:new FormControl(''),
    BusNumber:new FormControl(''),
    childrenNumber:new FormControl(''),
    TeacherId:new FormControl(''),
    DriverId:new FormControl('')
  })

  constructor(public home:HomeService,public dialog: MatDialog){}

@ViewChild('deleteDailog') CalldeleteDailog!:TemplateRef<any>;

OpenDeleteDailog(busid:number){
 const dailogResult= this.dialog.open(this.CalldeleteDailog);
 dailogResult.afterClosed().subscribe((result)=>{
  if(result !=undefined){
    if(result =='yes')
      this.home.DeleteBus(busid);
    else
    console.log('Thank you');
  }
 })
  
}
  ngOnInit(): void {
    this.home.getAllBuses();
  }
  

}
