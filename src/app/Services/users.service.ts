import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
baseURL='https://localhost:7169/api/User/';
  constructor(private http:HttpClient ,private spinner : NgxSpinnerService , private toastr:ToastrService) { } 
  AllTeachers: any=[

  ];

  AllDrivers : any=[

  ];

  AllParents : any=[

  ];
  
  User:any;
 UserObj:any;


 user2:any;
 GetMyId():number{
 this.user2=localStorage.getItem('user');
 this.user2=JSON.parse(this.user2);
 return this.user2.UserId;
}

  addUser(body:any){
    body.Imagepath = this.displayImage;
    this.http.post(this.baseURL,body).subscribe((res)=>{
      console.log('User created');
      this.toastr.success('Successfully Added','',{
        positionClass: 'toast-bottom-right'})
      window.location.reload();
    },err=>{
      console.log('error');
      this.toastr.error('Something Wont Wrong!!')
    })
  }



  
  getAllTeachers(){
    this.spinner.show();
    this.http.get(this.baseURL+'GetAllTeachers').subscribe(res=>{
      this.AllTeachers = res;
      
  },err => {
    console.log("error");
    console.log(err.status);
    this.toastr.error('Something Wont Wrong!!')
  })
  this.spinner.hide();
}

  


getAllDrivers(){
  this.spinner.show();
  this.http.get(this.baseURL+'GetAllDrivers').subscribe(res=>{
    this.AllDrivers = res;
   
  },err => {
    console.log("error");
    console.log(err.status);
    this.toastr.error('Something Wont Wrong!!')
  })
  this.spinner.hide();
}



getAllParents(){
  this.spinner.show();
  this.http.get(this.baseURL+'GetAllParents').subscribe(res=>{
    this.AllParents = res;
 
  },err => {
    console.log("error");
    console.log(err.status);
    this.toastr.error('Something Wont Wrong!!')
  })
  this.spinner.hide();
}



getUserById(userid: number){
  this.spinner.show();
  this.http.get(this.baseURL+userid).subscribe(res=>{
    this.User=res;
    console.log("Got The User By Id",this.User)
    this.toastr.success('Reterived Successfully','',{
      positionClass: 'toast-bottom-right'})  
    },err => {
    console.log("error getting user");
    console.log(err.status);
    this.toastr.error('Something Went Wrong!!')
  })
  this.spinner.hide();
}





DeleteUser(userid: number){
  this.spinner.show();
  this.http.delete(this.baseURL+userid).subscribe((res)=>{
    console.log(" User Deleted");
    window.location.reload();
    this.toastr.success('Successfully Deleted','',{
      positionClass: 'toast-bottom-right'})
  },err=>{
      console.log("Error");
      this.toastr.error('Something Wont Wrong!!')
  })
  this.spinner.hide();
 
  }
  

updateUser(body:any){
  this.spinner.show();
body.imagename = this.displayImage;
this.http.put(this.baseURL,body).subscribe((res)=>{
  console.log('User Updated');
  window.location.reload();
  this.toastr.success('Successfully Updated')
},err=>{
  console.log('error');
  this.toastr.error('Something Wont Wrong!!')
})
this.spinner.hide();
}

  displayImage:any;
  uploadAttachmenet(image:FormData){
    this.spinner.show();
    this.http.post(this.baseURL+'UploadImage',image).subscribe((resp:any)=>{
      this.displayImage= resp.imagename;
      this.toastr.success('Successfully Added')
    },err=>{
      console.log('error');
      this.toastr.error('Something Wont Wrong!!')
      
    })
    this.spinner.hide();
  }
  
}
