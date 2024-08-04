import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusLocationService {
  allBusesLocations : any=[]
    bus : any;

   private apiUrl = 'https://localhost:7169/api/BusLocation';
  constructor(private http: HttpClient ,private spinner : NgxSpinnerService , private toastr:ToastrService ) { }




  getAllBusesLocations(){
    this.spinner.show();
    debugger;
    this.http.get(`${this.apiUrl}/GetAllBusesLocations`).subscribe((res)=>{
      this.allBusesLocations = res;

      console.log(res)
      this.toastr.success('Reterived Successfully','',{
        positionClass: 'toast-bottom-right'})
    },err=>{
      console.log(err.status);
      this.toastr.error('Something Wont Wrong!!')
    })
    this.spinner.hide();
  }

  getLatestLocation(busId: number){
    this.spinner.show();
    this.http.get(`${this.apiUrl}/GetLatestLocation/${busId}`).subscribe((res)=>{
      this.bus = res;
      console.log(res)
      this.toastr.success('Reterived Successfully','',{
        positionClass: 'toast-bottom-right'})  
    },err=>{
      console.log("error getting bus location");
    console.log(err.status);
    this.toastr.error('Something Went Wrong!!')
    })
    this.spinner.hide();
  }

  updateLocation(location: any){
    this.http.post(this.apiUrl, location).subscribe((res)=>{
      console.log('Location updated');
      this.toastr.success('Location updated','',{
        positionClass: 'toast-bottom-right'})
      window.location.reload();
    },err=>{
      console.log('error');
      this.toastr.error('Something Wont Wrong!!')
    })
  }





}
