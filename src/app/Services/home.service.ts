import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  constructor(private http:HttpClient) { }

//declaring Arrays For Get All Methods

  AllBuses:any=[];

  allChildren:any=[];
  
  AllTeachers: any=[];

  AllDrivers : any=[];

  AllParents : any=[];

  AllTestimonials : any=[];

//Declaring variables for Get By Id Methods

  Bus:any;
  child:any;

//Get All Methods

getAllTestimonials(){
    this.http.get('https://localhost:7169/api/Testimonial').subscribe(response=>{
      this.AllTestimonials=response;
    },
    error=>{
      console.log("error Getting Testimonials");
      console.log(error.status)
      
    })
}

getAllBuses(){
  this.http.get('https://localhost:7169/api/Bus').subscribe(response=>{
    this.AllBuses=response;

  },
  error=>{
    console.log("error can not reach database");
    console.log(error.status)
    
  })
}

GetAllChildren(){
  this.http.get('https://localhost:7169/api/Children').subscribe((response)=>{
    this.allChildren=response;
    console.log('Got All Children');
  },error=>{
    console.log('error getting all children');
    console.log(error.status);
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

getBusById(userid: number){
  this.http.get('https://localhost:7169/api/Bus/'+userid).subscribe(response=>{
    this.Bus=response;
    console.log("Got The Bus By Id")
  },error => {
    console.log("error getting The Bus");
    console.log(error.status);
  })
}

getChildById(userid: number){
  this.http.get('https://localhost:7169/api/Children/'+userid).subscribe(response=>{
    this.child=response;
    console.log("Got The Child By Id")
  },error => {
    console.log("error getting The Child");
    console.log(error.status);
  })
}

//Delete Methods 


DeleteBus(Busid:number){
  this.http.delete("https://localhost:7169/api/Bus/delete/"+Busid).subscribe((response)=>{
    console.log(Busid);
    console.log("Bus Deleted");
  },error=>{
      console.log("Error Deleting Bus");
      console.log(error.status);
  })
}

DeleteChild(Childid:number){
  this.http.delete("https://localhost:7169/api/Children/delete/"+Childid).subscribe((response)=>{
    console.log(Childid);
    console.log("Delete Child");
  },error=>{
      console.log("Error Deleting Child");
      console.log(error.status);
  })
}

//Update Methods

updateBus(body:any){
  this.http.put("https://localhost:7169/api/Bus/",body).subscribe((response)=>{
    console.log('updated');
},error => {
  console.log("Error Updating Bus");
})
}


}
