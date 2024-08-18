import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ArrivalService } from 'src/app/Services/arrival.service';

@Component({
  selector: 'app-child-arrivals',
  templateUrl: './child-arrivals.component.html',
  styleUrls: ['./child-arrivals.component.css']
})
export class ChildArrivalsComponent implements OnInit{
  
constructor(public arrival:ArrivalService ,public dialog: MatDialog, private route: ActivatedRoute){}
ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.childId = Number(params.get('childid'));
    if (this.childId) {
      this.getArrival();
    }
  });
}

childId!:number
  @ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
  @ViewChild('updateDailog') callupdateDailog!:TemplateRef<any>; 
  UData:any ; 
  childArrival: any[] = [];
  updateArrivalsForm = new FormGroup({
    Status : new FormControl()
  })
  

  getArrival(): void {
    this.arrival.getArrival(this.childId).subscribe(
      (data) => {
        this.childArrival = data;
        console.log('Child Attendance:', this.childArrival);
      },
      (error) => {
        console.error('Error fetching attendance:', error);
      }
    );
  }
 

  openDeleteDailog(arrival: any): void {
    debugger
    const dialogResult = this.dialog.open(this.callDeleteDailog);
    dialogResult.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.arrival.DeleteArrival(arrival.arrivalid);
      } else {
        console.log('Delete operation canceled.');
      }
    });
  }
  
  openUpdateDialog(arrival: any): void {
    console.log('Arrival object:', arrival); // Log the entire object
  
    if (!arrival || !arrival.arrivalid) {  // Change Attendanceid to attendanceid
      console.error('Attendance object is missing or does not have a valid attendanceid:', arrival);
      return;
    }
  
    this.dialog.open(this.callupdateDailog);
    this.UData = arrival;
  
    console.log('UData after assignment:', this.UData);
  
    this.updateArrivalsForm.patchValue({
      Status: this.UData.status // Ensure that this matches the case of your object properties
    });
  }
  

  update(arrivalId: number): void {
    console.log('Updating arrival with ID:', arrivalId); // Log the ID being passed
    if (!arrivalId) {
      console.error('Invalid arrival ID:', arrivalId);
      return;
    }
  
    if (this.updateArrivalsForm.valid) {
      this.arrival.UpdateArrival(arrivalId, this.updateArrivalsForm.value)
    } else {
      console.error('Form is invalid');
    }
  }
  
}
