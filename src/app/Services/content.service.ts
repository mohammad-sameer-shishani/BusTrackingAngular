import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
basURL='https://localhost:7169/api/PageContent';
  constructor(private http:HttpClient) { }

  AllPageContent:any=[];
  getAllPageContent():any{
  this.http.get(this.basURL).subscribe((response)=>{
    this.AllPageContent=response;
    console.log('Got Page Content');
    return response;
  },error => {
  console.log("Error Getting Page Coontent");
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
