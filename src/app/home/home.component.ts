import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';
import { HomeService } from '../Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  
  contentDictionary: { [key: string]: string } = {};

constructor(public testi :TestimonialService,public home:HomeService){}
  
ngOnInit(): void {
  
  this.testi.GetAllTestimonials();
    this.createDictionary(this.home.getAllPageContent());
    
  }
  createDictionary(data: any[]) {
    data.forEach(item => {
      this.contentDictionary[item.contentkey] = item.contentvalue;
    });
  }

}
