import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusLocationService {
   private apiUrl = 'https://localhost:7169/api/BusLocation';
  constructor(private http: HttpClient) { }



  getLatestLocation(busId: number){
    this.http.get(`${this.apiUrl}/${busId}`);
  }

  updateLocation(location: any){
    this.http.post(this.apiUrl, location);
  }





}
