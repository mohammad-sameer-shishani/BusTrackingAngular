import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildService } from 'src/app/Services/child.service';
import { HomeService } from 'src/app/Services/home.service';
import { AddChildComponent } from '../add-child/add-child.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusService } from 'src/app/Services/bus.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.component.html',
  styleUrls: ['./manage-children.component.css']
})
export class ManageChildrenComponent implements OnInit{
  constructor(public home:HomeService,public dialog: MatDialog,public child:ChildService,public bus:BusService,public user:UsersService){}
  searchText: string = '';
  
  @ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
  @ViewChild('UpdateChildDailog') callUpdateDialog!:TemplateRef<any>; 

  prevChild:any;
  countBus:any;
  ngOnInit(): void {
    this.child.GetAllChildren();
    this.user.getAllParents();
    this.bus.getAllBuses();
  }
 
  UpdateChildForm: FormGroup = new FormGroup({
    childid: new FormControl(Validators.required),
    firstname: new FormControl(Validators.required),
    lastname: new FormControl(Validators.required),
    address: new FormControl(Validators.required),
    parentid: new FormControl(Validators.required),
    busid: new FormControl(Validators.required)
  });


  openAddDailog(){
    this.dialog.open(AddChildComponent);
  }


  OpenDeleteDailog(Childid:number){
    const dailogResult=this.dialog.open(this.callDeleteDailog);
      dailogResult.afterClosed().subscribe((result)=>{
        if(result !=undefined){
          if(result=='yes') 
            this.child.DeleteChild(Childid); 
          else 
          console.log('Thank you !');
        }
      })
    }

    OpenUpdateDialog(Child:any){
      this.prevChild=Child;
      this.UpdateChildForm.controls["childid"].setValue(this.prevChild.childid);
      console.log(this.prevChild);
      this.dialog.open(this.callUpdateDialog);
      this.child.updateChild(Child); 
      
    }

    UpdateChild(){
      this.child.updateChild(this.UpdateChildForm.value); 
    }
}
