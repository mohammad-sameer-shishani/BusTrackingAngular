import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/Services/content.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
 
constructor(public content:ContentService){}
  ngOnInit(): void {
    
  }

}
