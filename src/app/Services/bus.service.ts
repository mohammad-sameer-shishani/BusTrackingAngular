import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  myBus: any;
  AllBuses:any=[];
  Bus:any;
  baseURL='https://localhost:7169/api/Bus/';
  constructor(private http:HttpClient) { }

  getAllBuses(){
    this.http.get(this.baseURL).subscribe(response=>{
      this.AllBuses=response;
  
    },
    error=>{
      console.log("error can not reach database");
      console.log(error.status)
      
    })
  }
  getBusByDriverId(){
    this.http.get(this.baseURL).subscribe(response=>{
     
      this.myBus=response;
  
    },
    error=>{
      console.log("error can not reach database");
      console.log(error.status)
      
    })
  }

//Create Methods

CreatBus(body:any){
  this.http.post(this.baseURL,body).subscribe((response)=>{
    console.log('Bus Created');
    window.location.reload();
},error => {
  console.log("Error Creating Bus");
})
}

  //Update Methods

updateBus(body:any){
  this.http.put(this.baseURL,body).subscribe((response)=>{
    console.log('Bus Updated');
    window.location.reload();
},error => {
  console.log("Error Updating Bus");
})
}
//Delete Methods 


DeleteBus(Busid:number){
  this.http.delete(this.baseURL+"delete/"+Busid).subscribe((response)=>{
    console.log(Busid);
    console.log("Bus Deleted");
    window.location.reload();
  },error=>{
      console.log("Error Deleting Bus");
      console.log(error.status);
  })
}

//Get By Id Methods

getBusById(userid: number){
  this.http.get(this.baseURL+userid).subscribe(response=>{
    this.Bus=response;
    console.log("Got The Bus By Id")
  },error => {
    console.log("error getting The Bus");
    console.log(error.status);
  })
}

CountBuses():Number{
this.http.get(this.baseURL+'CountBuses').subscribe(response=>{
  return response;
},error=>{
}
)
return 0;
}



getBusForParent(parentId: number){
  this.http.get(this.baseURL+'CountBuses/'+parentId);
}

}
