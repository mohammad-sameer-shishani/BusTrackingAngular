import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from 'src/app/Services/contactus.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';




@Component({
  selector: 'app-manage-contactus',
  templateUrl: './manage-contactus.component.html',
  styleUrls: ['./manage-contactus.component.css']
})
export class ManageContactusComponent implements OnInit{
constructor(public contact : ContactusService,public dialog: MatDialog , private router:Router){}

panelOpenState = false;

@ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
ngOnInit(): void {
  debugger;
  this.contact.getAllContactMessage();
}


openDeleteDailog(contactusid:number){
  const dailogResult=   this.dialog.open(this.callDeleteDailog);
    dailogResult.afterClosed().subscribe((result)=>{
      if(result !=undefined){
        if(result=='yes') 
          this.contact.DeleteEmail(contactusid); 
        else 
        console.log('Thank you !');
      }
    })
  }

}
