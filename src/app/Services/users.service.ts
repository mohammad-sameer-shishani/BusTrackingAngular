import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { } 
  AllTeachers: any=[

  ];

  AllDrivers : any=[

  ];

  AllParents : any=[

  ];
  

  addUser(body:any){
    this.http.post('https://localhost:7169/api/User',body).subscribe((res)=>{
      console.log('User created');
      window.location.reload();
    },err=>{
      console.log('error');
    })
  }



  
  getAllTeachers(){
    this.http.get('https://localhost:7169/api/User/GetAllTeachers').subscribe(res=>{
      this.AllTeachers = res;
  },err => {
    console.log("error");
    console.log(err.status);
  })
}

  


getAllDrivers(){
  this.http.get('https://localhost:7169/api/User/GetAllDrivers').subscribe(res=>{
    this.AllDrivers = res;
  },err => {
    console.log("error");
    console.log(err.status);
  })
}



getAllParents(){
  this.http.get('https://localhost:7169/api/User/GetAllParents').subscribe(res=>{
    this.AllParents = res;
  },err => {
    console.log("error");
    console.log(err.status);
  })
}



getUserById(userid: number){
  this.http.get('https://localhost:7169/api/User/'+userid).subscribe(res=>{
    console.log("success")
  },err => {
    console.log("error");
    console.log(err.status);
  })
}





DeleteUser(userid: number){
  this.http.delete('https://localhost:7169/api/User/'+userid).subscribe((res)=>{
    console.log(" User Deleted");
    window.location.reload();
  },err=>{
      console.log("Error");
  })
  }
  

updateUser(body:any){
body.imagename = this.displayImage;
this.http.put('https://localhost:7169/api/User/',body).subscribe((res)=>{
  console.log('User Updated');
  window.location.reload();
},err=>{
  console.log('error');
})
}

  displayImage:any;
  uploadAttachmenet(image:FormData){
    this.http.post('https://localhost:7169/api/User/uploadImage',image).subscribe((resp:any)=>{
      this.displayImage= resp.imagename;
    },err=>{
      console.log('error');
      
    })
  
  }
}
