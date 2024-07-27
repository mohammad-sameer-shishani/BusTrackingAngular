import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http:HttpClient) { }

//declaring Arrays For Get All Methods

  AllBuses:any=[];


  


  AllTestimonials : any=[];

//Declaring variables for Get By Id Methods

  Bus:any;
  

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

//Update Methods

updateBus(body:any){
  this.http.put("https://localhost:7169/api/Bus/",body).subscribe((response)=>{
    console.log('updated');
},error => {
  console.log("Error Updating Bus");
})
}


}
