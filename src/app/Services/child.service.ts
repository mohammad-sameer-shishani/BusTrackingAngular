import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http:HttpClient) { }

//declaring Arrays For Get All Methods
  allChildren:any=[];

  //Declaring variables for Get By Id Methods
  child:any;



//get all children
GetAllChildren(){
    this.http.get('https://localhost:7169/api/Children').subscribe((response)=>{
      this.allChildren=response;
      console.log('Got All Children');
    },error=>{
      console.log('error getting all children');
      console.log(error.status);
    })
  }



//Get By Id Methods
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
DeleteChild(childId : number){
  this.http.delete('https://localhost:7169/api/Children'+childId).subscribe(response=>{
    this.child=response;
    console.log("deleted");
  },err=>{
    console.log("error");
    console.log(err.status);
  }) 
}

//create child
addChild(body:any){
  this.http.post('https://localhost:7169/api/Children',body).subscribe((res)=>{
    console.log('created');
  },err=>{
    console.log('error');
  })
}


}
