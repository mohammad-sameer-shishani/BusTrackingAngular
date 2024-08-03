import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeService } from 'src/app/Services/home.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  constructor(public user : UsersService,public home:HomeService){}
  ngOnInit(): void {
    this.home.getAllRoles();
  }


  addUserForm:FormGroup = new FormGroup(
    {
      Firstname :new FormControl('', Validators.required ),
      Lastname :new FormControl( '',Validators.required ),   
      Username : new FormControl('',[Validators.required,Validators.minLength(5)]),  
      Roleid : new FormControl('',Validators.required), 
      Password : new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(40)]),
      Imagepath: new FormControl(),
      Phone : new FormControl('',[Validators.minLength(10),Validators.maxLength(14)]),
      Address : new FormControl(),
      Gender : new FormControl(),
      Email : new FormControl('',[Validators.email  ,Validators.required])
      
  
    }
  )
  
  
  add(){
    this.user.addUser(this.addUserForm.value);
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
