import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.component.html',
  styleUrls: ['./manage-children.component.css']
})
export class ManageChildrenComponent implements OnInit{
Child: any;
  constructor(public home:HomeService,public dialog: MatDialog){}
 
@ViewChild('deleteDailogChild') CalldeleteDailog!:TemplateRef<any>;

OpenDeleteDailog(Childid:number){
 const dailogResult= this.dialog.open(this.CalldeleteDailog);
 dailogResult.afterClosed().subscribe((result)=>{
  if(result !=undefined){
    if(result =='yes')
      this.home.DeleteChild(Childid);
    else
    console.log('Thank you');
  }
 })
  
}
  ngOnInit(): void {
    this.home.GetAllChildren();
  }

}
