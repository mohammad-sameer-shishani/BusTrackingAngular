import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ChildService{

  constructor(private http:HttpClient,public taostr:ToastrService,public router:Router) { }



//declaring Arrays For Get All Methods
  allChildren:any=[];
  myChildren:any=[];
  ChildrenByDriverId:any=[];
  user:any;
  userid:any;
  //Declaring variables for Get By Id Methods
  child:any;
  
  baseURL='https://localhost:7169/api/Children/';
  
  user2:any;
  GetMyId():number{
  this.user2=localStorage.getItem('user');
  this.user2=JSON.parse(this.user2);
  return this.user2.UserId;
}

//get all children
GetAllChildren(){
 
  this.http.get(this.baseURL).subscribe((response)=>{
    this.allChildren=response;
    console.log('Got All Children');
  },error=>{
    console.log('error getting all children');
    console.log(error.status);

  })
}


GetChildrenByDriverId(driverid:number){ 
  this.http.get(this.baseURL+'GetChildrenByDriverId/'+driverid).subscribe((response)=>{
    this.ChildrenByDriverId=response;
    console.log('Got Children By Driver Id');
  },error=>{
    console.log('error getting children');
    console.log(error.status);
  })
}

//get my children
GetMyChildren(parentid:any){
  this.http.get(this.baseURL+'GetChildrenByParentId/'+parentid).subscribe((response)=>{
    this.myChildren=response;
    console.log('Got my Children');
  },error=>{
    console.log('error getting my children');
    console.log(error.status);
  })
}


//Get By Id Methods
getChildById(userid: number){
  this.http.get(this.baseURL+userid).subscribe(response=>{
    this.child=response;
    console.log("Got The Child By Id")
  },error => {
    console.log("error getting The Child");
    console.log(error.status);
  })
}


//Delete Methods 
DeleteChild(childId : number){

  this.http.delete(this.baseURL+'delete/'+childId).subscribe(response=>{
    this.child=response;
    console.log("child deleted");
    window.location.reload();
  },err=>{
    console.log("error deleting child");
    console.log(err.status);
  }) 
}

//create child
addChild(body:any){
  this.http.post(this.baseURL,body).subscribe(response=>{
    console.log('child added');
    window.location.reload();
  },err=>{
    console.log('error adding Child');
    console.log(err.status);
  })
  
}

updateChild(body:any){

  this.http.put(this.baseURL,body).subscribe((response)=>{
    console.log('Updated Child');
    window.location.reload();

},error => {
  console.log("Error Updating Child");
  console.log(error.status);
})
}


GetAttendance(){
  this.http.get(this.baseURL+'')
}

}
