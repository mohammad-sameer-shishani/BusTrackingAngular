import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CreateChildComponent } from '../create-child/create-child.component';
import { ChildService } from 'src/app/Services/child.service';


@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.component.html',
  styleUrls: ['./manage-children.component.css']
})
export class ManageChildrenComponent implements OnInit{
  constructor(public child:ChildService, public dialog: MatDialog){}

  @ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
  ngOnInit(): void {
    this.child.GetAllChildren();
  }

  openAddDailog(){
    this.dialog.open(CreateChildComponent)
  }

  
  openDeleteDailog(Childid:number){
    const dailogResult=   this.dialog.open(this.callDeleteDailog);
      dailogResult.afterClosed().subscribe((result)=>{
        if(result !=undefined){
          if(result=='yes') 
            this.child.DeleteChild(Childid); 
          else 
          console.log('Thank you !');
        }
      })
    }


}
