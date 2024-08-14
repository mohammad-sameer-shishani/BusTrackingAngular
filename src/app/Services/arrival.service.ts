import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrivalService {

  baseURL='https://localhost:7169/api/Arrival';

  constructor(private http :HttpClient) { }


  AddArrival(arrival:any){
    this.http.post(this.baseURL,arrival).subscribe(res=>{
      console.log('arrival added')
      
    },error=>{

      console.log('error adding arrival')
    });
    
  }
}
