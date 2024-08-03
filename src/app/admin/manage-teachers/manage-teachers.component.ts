import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/Services/users.service';
import { AdduserComponent } from '../adduser/adduser.component';

@Component({
  selector: 'app-manage-teachers',
  templateUrl: './manage-teachers.component.html',
  styleUrls: ['./manage-teachers.component.css']
})
export class ManageTeachersComponent {

  constructor(public driver:UsersService,public dialog: MatDialog , private router:Router){}

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
  
  @ViewChild('deleteDailog') callDeleteDailog!:TemplateRef<any>; 
  @ViewChild('updateDailog') callupdateDailog!:TemplateRef<any>; 
  UData:any ; 
  
  
  openUpdateDialog(driver:any){
    console.log(driver);
    this.dialog.open(this.callupdateDailog)
    this.UData = driver;
    console.log(this.UData);
    this.UserUpdateForm.controls['userid'].setValue(this.UData.userid);
  }
  
  update(){
    this.driver.updateUser(this.UserUpdateForm.value);
  }
  
  
  
  
  
  openDeleteDailog(userid:number){
    const dailogResult=   this.dialog.open(this.callDeleteDailog);
      dailogResult.afterClosed().subscribe((result)=>{
        if(result !=undefined){
          if(result=='yes') 
            this.driver.DeleteUser(userid); 
          else 
          console.log('Thank you !');
        }
      })
    }
  
  
  ngOnInit(): void {
    this.driver.getAllTeachers();
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
    this.driver.uploadAttachmenet(formData);
  
  }
  

}
