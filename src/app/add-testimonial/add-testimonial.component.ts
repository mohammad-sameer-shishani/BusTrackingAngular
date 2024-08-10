import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../Services/testimonial.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.css']
})
export class AddTestimonialComponent implements OnInit{
  publisherid:any;
  status:any='Pending';
  constructor(public testi:TestimonialService ,public dialog:MatDialog){}
  ngOnInit(): void {
    this.publisherid=this.testi.GetMyId();
  }
  addTestimonialForm:FormGroup = new FormGroup(
    {
      publisher_Id :new FormControl(),
      message : new FormControl('',Validators.required),
      status :new FormControl()
    }
  )

  AddTestimonial()
    {
      this.addTestimonialForm.controls['publisher_Id'].setValue(this.publisherid);
      this.addTestimonialForm.controls['status'].setValue('pending');
      this.testi.addTestimonial(this.addTestimonialForm.value)
    }
  
}
