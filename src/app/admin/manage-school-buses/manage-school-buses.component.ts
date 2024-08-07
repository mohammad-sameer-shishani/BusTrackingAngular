import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BusService } from 'src/app/Services/bus.service';
import { HomeService } from 'src/app/Services/home.service';
import { AddBusComponent } from '../add-bus/add-bus.component';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-manage-school-buses',
  templateUrl: './manage-school-buses.component.html',
  styleUrls: ['./manage-school-buses.component.css']
})
export class ManageSchoolBusesComponent implements OnInit {
  
  constructor(public home: HomeService,public bus: BusService, public dialog: MatDialog,public user:UsersService) { }
  
  ngOnInit(): void {
    this.bus.getAllBuses();
    this.user.getAllDrivers();
    this.user.getAllTeachers()
  }
  updateForm: FormGroup = new FormGroup({
    busid: new FormControl(''),
    busnumber: new FormControl('',Validators.required),
    childrennumber: new FormControl('',Validators.required),
    teacherid: new FormControl('',Validators.required),
    driverid: new FormControl('',Validators.required)
  });


  @ViewChild('deleteDailog') CalldeleteDailog!: TemplateRef<any>;
  @ViewChild('updateBusDialog') CallupdateBusDialog!: TemplateRef<any>;
  pData: any;


  openUpdateDailog(bus: any) {
    console.log(bus);
    this.pData = bus;
    this.updateForm.controls["busid"].setValue(this.pData.busid);
    this.dialog.open(this.CallupdateBusDialog);
    console.log(this.pData);
  }

  OpenDeleteDailog(busid: number) {
    const dailogResult = this.dialog.open(this.CalldeleteDailog);
    dailogResult.afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.bus.DeleteBus(busid);
        } else {
          console.log('Thank you');
        }
      }
    });
  }

  OpenCreatDailog(){

    this.dialog.open(AddBusComponent)
  }
 


  update() {
    this.bus.updateBus(this.updateForm.value);
  }
}
