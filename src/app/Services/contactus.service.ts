import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactusService {

  constructor(private http:HttpClient) { }
allContactUs: any=[

];

  getAllContactMessage(){
    this.http.get('https://localhost:7169/api/ContactUs').subscribe(res=>{
      this.allContactUs = res;
      console.log("good");
  },err => {
    console.log("error");
    console.log(err.status);
  })
  }


 
  createContactUs(body:any){
    this.http.post('https://localhost:7169/api/ContactUs',body).subscribe((res)=>{
      console.log("success")
      window.location.reload();
    },err=>{
      console.log("something wrong");
    })
  }





  DeleteEmail(contactusid: number){
    this.http.delete('https://localhost:7169/api/ContactUs/'+contactusid).subscribe((res)=>{
      console.log(" Email Deleted");
      window.location.reload();
     
    },err=>{
        console.log("Error");
    })
    }
    




















}
