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

  this.http.delete('https://localhost:7169/api/Children/delete/'+childId).subscribe(response=>{
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
  this.http.post('https://localhost:7169/api/Children',body).subscribe(response=>{
    console.log('child added');
    window.location.reload();
  },err=>{
    console.log('error adding Child');
    console.log(err.status);
  })
  
}

updateChild(body:any){

  this.http.put('https://localhost:7169/api/children',body).subscribe((response)=>{
    console.log('Updated Child');
    window.location.reload();

},error => {
  console.log("Error Updating Child");
  console.log(error.status);
})
}

}
