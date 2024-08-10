import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../Services/contactus.service';
import { ContentService } from '../Services/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(public contact:ContactusService,public home : ContentService){}
  
  ContactUsForm:FormGroup = new FormGroup(
    {
      userName: new FormControl('',Validators.required),
      subject:new FormControl('',Validators.required),
      userEmail:new FormControl('',[Validators.required,Validators.email]),
      message:new FormControl('',[Validators.required,Validators.minLength(15)]),
    })
  
  Send(){
    this.contact.createContactUs(this.ContactUsForm.value);
  }
  
  
  
  }