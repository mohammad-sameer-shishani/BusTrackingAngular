import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactusService } from '../Services/contactus.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

constructor(public contact:ContactusService){}

ContactUsForm:FormGroup = new FormGroup(
  {
    userName: new FormControl(),
    subject:new FormControl(),
    userEmail:new FormControl(),
    message:new FormControl(),
  })

Send(){
  this.contact.createContactUs(this.ContactUsForm.value);
}



}
