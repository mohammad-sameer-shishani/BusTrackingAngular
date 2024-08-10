import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
basURL='https://localhost:7169/api/PageContent/';

homepageTitle:any;
footerTitle:any;
phoneNumber:any;
address:any;
email:any;
aboutusContent:any;
street:any;

constructor(private http:HttpClient) { }

  AllPageContent:any=[];
  getAllPageContent():any{
  this.http.get(this.basURL).subscribe((response)=>{
    this.AllPageContent=response;
    console.log('Got Page Content');
  },error => {
  console.log("Error Getting Page Coontent");
  })
  }


   getContentByKey(key:string):any{
     this.http.get(this.basURL+'key/'+key).subscribe((response)=>{
      console.log('got content by key'+key);
      if (key=="About Us Content") {
        this.aboutusContent=response
      }
      if (key=="Footer Email") {
        this.email=response
      }
      if (key=="Footer Phone Number") {
        this.phoneNumber=response
      }
      if (key=="Footer Address") {
        this.address=response
      }
      if (key=="Home Page Title") {
        this.homepageTitle=response
      }
      if (key=="Home Page Footer Title") {
        this.footerTitle=response
      } 
      if (key=="Street") {
        this.street=response
      }
    },error => {
    console.log("Error Getting "+key+" Content");
    })
    }

UpdateContent(body:any){
  this.http.put(this.basURL,body).subscribe((response)=>{
    console.log('content updated');
    window.location.reload();
},error => {
  console.log("Error Updating content");
})
}

}
