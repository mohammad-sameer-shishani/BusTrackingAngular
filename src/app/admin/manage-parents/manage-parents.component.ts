import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-manage-parents',
  templateUrl: './manage-parents.component.html',
  styleUrls: ['./manage-parents.component.css']
})
export class ManageParentsComponent {

  constructor(public parent:UsersService,public dialog: MatDialog , private router:Router){}

  UserUpdateForm : FormGroup = new FormGroup({
    userid : new FormControl(),
    firstname : new FormControl(),
    lastname : new FormControl(),
    phone : new FormControl(),
    address : new FormControl(),
    username : new FormControl,
    gender : new FormControl(),
    Imagepath:new FormControl()
  
  })
  
  @ViewChild('deleteParentDailog') callDeleteDailog!:TemplateRef<any>; 
  @ViewChild('updateParentDailog') callupdateDailog!:TemplateRef<any>; 
  UData:any ; 
  
  
  openUpdateDialog(parent:any){
    console.log(parent);
    this.dialog.open(this.callupdateDailog)
    this.UData = parent;
    console.log(this.UData);
    this.UserUpdateForm.controls['userid'].setValue(this.UData.userid);
  }
  
  update(){
    this.parent.updateUser(this.UserUpdateForm.value);
  }
  
  
  openDeleteDailog(userid:number){
    const dailogResult=   this.dialog.open(this.callDeleteDailog);
      dailogResult.afterClosed().subscribe((result)=>{
        if(result !=undefined){
          if(result=='yes') 
            this.parent.DeleteUser(userid); 
          else 
          console.log('Thank you !');
        }
      })
    }
  
  
  ngOnInit(): void {
    this.parent.getAllParents();
  }
  
  
  
  adduser(){
    this.router.navigate(['admin/adduser'])
  }
  
  
  openCreateDailog(){
    this.dialog.open(AdduserComponent)
  }
  
  
  uploadImage(file:any){
    if(file.length ==0 )
      return; 
  
    let fileToUpload =<File> file[0]; 
  
    const formData = new FormData(); 
    formData.append('file' ,fileToUpload,fileToUpload.name ); 
    this.parent.uploadAttachmenet(formData);
  
  }
  

}
