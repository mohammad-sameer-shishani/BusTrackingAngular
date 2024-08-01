import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StopsService {
  private apiUrl = ' https://localhost:7169/api/Stops';
  constructor(private http: HttpClient) { }

  getStops(busId: number) {
    this.http.get(`${this.apiUrl}/bus/${busId}`);
  }

  getStop(stopId: number){
     this.http.get(`${this.apiUrl}/${stopId}`);
  }

  addStop(stop: any){
    this.http.post(this.apiUrl, stop);
  }

  updateStop(stopId: number, stop: any){
    this.http.put(`${this.apiUrl}/${stopId}`, stop);
  }

  deleteStop(stopId: number){
    this.http.delete(`${this.apiUrl}/${stopId}`);
  }





}
