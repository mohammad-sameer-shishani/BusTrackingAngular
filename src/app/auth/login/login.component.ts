import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router :Router){}
  login(){
    console.log('trying to login') //TO DO
    this.router.navigate(['/home']);
  }
loginForm:FormGroup=new FormGroup({

  email:new FormControl('',[Validators.required,Validators.email]),
  password :new FormControl('',[Validators.minLength(8),Validators.required])

}) 

}
