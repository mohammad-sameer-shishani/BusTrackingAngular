import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  constructor(public user:UsersService,public dialog:MatDialog){}
  userId:any;
  userInfo:any;
  UData:any;
  ngOnInit(): void {
    this.user.getUserById(this.GetUserIdFromLocal());
    
  }
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

  
  @ViewChild('updateUserDailog') callupdateDailog!:TemplateRef<any>; 
  

GetUserIdFromLocal():number{
    let user=localStorage.getItem("user");
    if (user) {
      // Parse the JSON string to an object
      let userObj = JSON.parse(user);
      let id=userObj.UserId;
      return id;
  } else {
      console.log("No user found in localStorage");
      return 0;
  }
  }

GetUserInfo(id:number){
  this.userInfo=this.user.getUserById(id);
}

update(){
  this.user.updateUser(this.UserUpdateForm.value);
}
openUpdateDialog(user:any){
  console.log(user);
  this.dialog.open(this.callupdateDailog)
  this.UData = user;
  console.log(this.UData);
  this.UserUpdateForm.controls['userid'].setValue(this.UData.userid);
}

uploadImage(file:any){
  if(file.length ==0 )
    return; 

  let fileToUpload =<File> file[0]; 

  const formData = new FormData(); 
  formData.append('file' ,fileToUpload,fileToUpload.name ); 
  this.user.uploadAttachmenet(formData);

}
}