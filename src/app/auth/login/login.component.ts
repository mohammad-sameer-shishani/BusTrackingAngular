import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
loginForm:FormGroup=new FormGroup({

  email:new FormControl('',[Validators.required,Validators.email]),
  password :new FormControl('',[Validators.minLength(8),Validators.required])

}) 

login(){
  console.log('trying to login') //TO DO
}
}
