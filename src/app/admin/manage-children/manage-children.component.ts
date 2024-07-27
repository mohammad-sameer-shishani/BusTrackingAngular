import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChildService } from 'src/app/Services/child.service';
import { HomeService } from 'src/app/Services/home.service';
import { AddChildComponent } from '../add-child/add-child.component';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.component.html',
  styleUrls: ['./manage-children.component.css']
})
export class ManageChildrenComponent implements OnInit{
  Child: any;
  constructor(public home:HomeService,public dialog: MatDialog,public child:ChildService){}
  
  @ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
  ngOnInit(): void {
    this.child.GetAllChildren();
  }

  openAddDailog(){
    this.dialog.open(AddChildComponent);
  }


  OpenDeleteDailog(Childid:number){
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
