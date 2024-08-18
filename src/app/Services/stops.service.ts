import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class StopsService {

  BusStops:any=[];
  StopForBus : any;

  private apiUrl = 'https://localhost:7169/api/Stops/';
  constructor(private http: HttpClient,private spinner : NgxSpinnerService , private toastr:ToastrService) { }

  getStops(busId: number) {
    this.spinner.show();
    this.http.get(this.apiUrl+'BusStops/'+busId).subscribe((res)=>{
      this.BusStops =res;
     // console.log(res)
     // this.toastr.success('Reterived Successfully','',{
     //   positionClass: 'toast-bottom-right'})
    },err=>{
      console.log("error gitting stops");
    console.log(err.status);
    this.toastr.error('Something Wont Wrong!!')
    })
    this.spinner.hide();
  }

  getStop(stopId: number){
    this.spinner.show();
     this.http.get(this.apiUrl+'Getstop/'+stopId).subscribe((res)=>{
      this.StopForBus = res; 
      console.log(res)
     // this.toastr.success('Reterived Successfully','',{
       // positionClass: 'toast-bottom-right'})
    },err=>{
      console.log("Error retrieving stop with ID:", stopId);
        console.log(err.status);
        if (err.status === 404) {
            this.toastr.error('Stop not found!')
        } else {
            this.toastr.error('Something Went Wrong!!')
        }
    })
    this.spinner.hide();
  }

  addStop(stop: any){
    this.spinner.show();
    this.http.post(this.apiUrl, stop).subscribe((res)=>{
      console.log('User created');
      this.toastr.success('Successfully Added','',{
        positionClass: 'toast-bottom-right'})
      window.location.reload();
    },err=>{
      console.log('error adding stop');
      this.toastr.error('Something Wont Wrong!!')
    })
    this.spinner.hide();
  }

  updateStop(stopId: number, stop: any){
    this.spinner.show();
    this.http.put(`${this.apiUrl}${stopId}`, stop).subscribe((res)=>{
      console.log('stop Updated');
      window.location.reload();
      this.toastr.success('Successfully Updated')
    },err=>{
      console.log('error updating stop');
      this.toastr.error('Something Wont Wrong!!')
    })
    this.spinner.hide();
  }

  deleteStop(stopId: number){
    this.spinner.show();
    this.http.delete(`${this.apiUrl}${stopId}`).subscribe((res)=>{
      console.log(" stop Deleted");
      window.location.reload();
      this.toastr.success('Successfully Deleted','',{
        positionClass: 'toast-bottom-right'})
    },err=>{
        console.log("Error deleting stop");
        this.toastr.error('Something Wont Wrong!!')
    })
    this.spinner.hide();
   
    }





}
