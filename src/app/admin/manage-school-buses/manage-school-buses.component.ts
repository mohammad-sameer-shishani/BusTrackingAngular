import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-school-buses',
  templateUrl: './manage-school-buses.component.html',
  styleUrls: ['./manage-school-buses.component.css']
})
export class ManageSchoolBusesComponent implements OnInit {
  constructor(public home: HomeService, public dialog: MatDialog) { }
  
  updateForm: FormGroup = new FormGroup({
    busid: new FormControl(''),
    BusNumber: new FormControl(''),
    childrenNumber: new FormControl(''),
    TeacherId: new FormControl(''),
    DriverId: new FormControl('')
  });


  @ViewChild('deleteDailog') CalldeleteDailog!: TemplateRef<any>;
  @ViewChild('updateBusDialog') CallupdateBusDialog!: TemplateRef<any>;
  
  teachers:any=[];
  pData: any;

    ngOnInit(): void {
      this.home.getAllBuses();
      this.home.getAllTeachers();
      this.home.getAllDrivers();
    }

  getTeachersNames(){
    this.teachers=this.home.AllTeachers;
  }


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
          this.home.DeleteBus(busid);
        } else {
          console.log('Thank you');
        }
      }
    });
  }

  update() {
    this.home.updateBus(this.updateForm.value);
  }
}
