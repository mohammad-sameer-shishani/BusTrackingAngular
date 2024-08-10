import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {
baseURL='https://localhost:7169/api/ContactUs/';
  constructor(private http:HttpClient) { }
allContactUs: any=[

];

  getAllContactMessage(){
    this.http.get(this.baseURL).subscribe(res=>{
      this.allContactUs = res;
      console.log("good");
  },err => {
    console.log("error");
    console.log(err.status);
  })
  }


 
  createContactUs(body:any){
    this.http.post(this.baseURL,body).subscribe((res)=>{
      console.log("success")
      window.location.reload();
    },err=>{
      console.log("error while trying to add contactus ");
    })
  }





  DeleteEmail(contactusid: number){
    this.http.delete(this.baseURL+contactusid).subscribe((res)=>{
      console.log(" Email Deleted");
      window.location.reload();
     
    },err=>{
        console.log("Error");
    })
    }
    




















}
