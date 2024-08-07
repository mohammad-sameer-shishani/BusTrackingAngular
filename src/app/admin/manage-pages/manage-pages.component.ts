import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContentService } from 'src/app/Services/content.service';

@Component({
  selector: 'app-manage-pages',
  templateUrl: './manage-pages.component.html',
  styleUrls: ['./manage-pages.component.css']
})
export class ManagePagesComponent implements OnInit { 
  constructor(public content: ContentService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.content.getAllPageContent();
  }
  @ViewChild('updateContentDialog') callUpdatePageDialog!:TemplateRef<any>;

  updatePageForm:FormGroup=new FormGroup({
    pagecontentid:new FormControl(Validators.required),
    pagename:new FormControl(Validators.required),
    contentkey:new FormControl(Validators.required),
    contentvalue:new FormControl(Validators.required)
  });

pData:any;

  openUpdatePageDailog(pageContent:any){
    this.pData=pageContent;
    this.updatePageForm.controls["pagecontentid"].setValue(this.pData.pagecontentid);
    this.updatePageForm.controls["pagename"].setValue(this.pData.pagename);
    this.updatePageForm.controls["contentkey"].setValue(this.pData.contentkey);
    this.dialog.open(this.callUpdatePageDialog);
  }

  UpdateContent(){
    this.content.UpdateContent(this.updatePageForm.value);
  }

}

