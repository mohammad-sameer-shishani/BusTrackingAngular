import { Component, OnInit } from '@angular/core';
import { TestimonialService } from '../Services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
  constructor(public testi:TestimonialService){}
  ngOnInit(): void {
    this.testi.GetAllTestimonials();

  }

}
