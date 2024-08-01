import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http:HttpClient) { }
  AllBuses:any=[];
  Bus:any;

  getAllBuses(){
    this.http.get('https://localhost:7169/api/Bus').subscribe(response=>{
      this.AllBuses=response;
  
    },
    error=>{
      console.log("error can not reach database");
      console.log(error.status)
      
    })
  }


//Create Methods

CreatBus(body:any){
  this.http.post('https://localhost:7169/api/Bus/',body).subscribe((response)=>{
    console.log('Bus Created');
},error => {
  console.log("Error Creating Bus");
})
}

  //Update Methods

updateBus(body:any){
  this.http.put("https://localhost:7169/api/Bus/",body).subscribe((response)=>{
    console.log('Bus Updated');
    window.location.reload();
},error => {
  console.log("Error Updating Bus");
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

CountBuses():Number{
this.http.get('https://localhost:7169/api/Bus/CountBuses').subscribe(response=>{
  return response;
},error=>{
}
)
return 0;
}

}
