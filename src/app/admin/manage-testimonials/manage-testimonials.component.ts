import { Component, OnInit } from '@angular/core';
import { TestimonialService } from 'src/app/Services/testimonial.service';

@Component({
  selector: 'app-manage-testimonials',
  templateUrl: './manage-testimonials.component.html',
  styleUrls: ['./manage-testimonials.component.css']
})
export class ManageTestimonialsComponent implements OnInit{
  constructor(public testi :TestimonialService){}
  ngOnInit(): void {
    this.testi.GetAllTestimonials();
  }
  
  acceptTestimonial(test :any){
    test.status='Accept';
    this.testi.updateTestimonial(test);
  }

  rejectTestimonial(test:any){
    test.status='Reject';
    this.testi.updateTestimonial(test);
  }

}
