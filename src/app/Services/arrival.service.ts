import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArrivalForChild } from '../models/ArrivalForChild';

@Injectable({
  providedIn: 'root'
})
export class ArrivalService {

  baseURL='https://localhost:7169/api/Arrival/';

  constructor(private http :HttpClient) { }


  AddArrival(arrival:any){
    this.http.post(this.baseURL,arrival).subscribe(res=>{
      console.log('arrival added')
      
    },error=>{

      console.log('error adding arrival')
    });
    
  }

 
  UpdateArrival(arrivalid : number ,body:any){
    this.http.put(this.baseURL+arrivalid, body).subscribe((res)=>{
      console.log('arrival Updated');
      window.location.reload();
    },err=>{
      console.log('error Updating arrival' );
    })
  }

  DeleteArrival(arrivalid : number){
    this.http.delete(this.baseURL+arrivalid).subscribe((res)=>{
      window.location.reload();
    },err=>{
      console.log("Error deleting arrival");
  })
  }

  
  getArrival(childId: number): Observable<ArrivalForChild[]> {
    return this.http.get<ArrivalForChild[]>(`${this.baseURL}${childId}`);
  }


}
