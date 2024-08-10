import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';
import { HomeService } from '../Services/home.service';
import { ContentService } from '../Services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  

constructor(public testi :TestimonialService,public home:ContentService){}
 
ngOnInit(): void {
  
  this.home.getContentByKey('Home Page Title');
  this.home.getContentByKey('Home Page Footer Title');
  this.home.getContentByKey('About Us Content');
  this.home.getContentByKey('Footer Email');
  this.home.getContentByKey('Footer Phone Number');
  this.home.getContentByKey('Footer Address');
  this.home.getContentByKey('Street');
  
  
  this.testi.GetAllTestimonials();
  }

}
