import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http:HttpClient) { }

  AllPageContent:any=[];
getAllPageContents(){
  this.http.get('https://localhost:7169/api/PageContent').subscribe(response=>{
    this.AllPageContent= response;
    console.log('Got All Page Contents');
  },error => {
    console.log("error Getting All Page Contents");
    console.log(error.status);
  })

}

UpdateContent(body:any){
  this.http.put("https://localhost:7169/api/PageContent",body).subscribe((response)=>{
    console.log('content updated');
    window.location.reload();
},error => {
  console.log("Error Updating content");
})
}

}
