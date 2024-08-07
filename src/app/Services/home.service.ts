import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http:HttpClient) { }

//declaring Arrays For Get All Methods


  allChildren:any=[];
  
  AllTeachers: any=[];

  AllDrivers : any=[];

  AllParents : any=[];

  AllTestimonials : any=[];
  AllRoles:any=[];

//Declaring variables for Get By Id Methods

  Bus:any;
  child:any;
  testimonial:any;

//Get All Methods
num:any;


user2:any;
GetMyId():number{
this.user2=localStorage.getItem('user');
this.user2=JSON.parse(this.user2);
return this.user2.UserId;
}



getAllRoles(){
  this.http.get('https://localhost:7169/api/Role').subscribe(response=>{
    this.AllRoles=response;
    console.log("Got Roles");
  },
  error=>{
    console.log("error Getting Testimonials");
    console.log(error.status)
  })
}



getAllTeachers(){
  this.http.get('https://localhost:7169/api/User/GetAllTeachers').subscribe(response=>{
    this.AllTeachers = response;
    console.log('Got All Teachers');
  },error => {
    console.log("error");
    console.log(error.status);
  })
}

getAllDrivers(){
  this.http.get('https://localhost:7169/api/User/GetAllDrivers').subscribe(response=>{
    this.AllDrivers = response;
    console.log('Got All Drivers');
  },error => {
    console.log("error");
    console.log(error.status);
  })
}

getAllParents(){
  this.http.get('https://localhost:7169/api/User/GetAllParents').subscribe(response=>{
    this.AllParents = response;
    console.log('Got All Parents');
  },error => {
    console.log("error");
    console.log(error.status);
  })
}

//Get By Id Methods





//Delete Methods 



//Update Methods




}
