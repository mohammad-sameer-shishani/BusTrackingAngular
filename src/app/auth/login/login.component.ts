import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private auth:AuthService){}

  email=new FormControl('',[Validators.required,Validators.email]);
  password =new FormControl('',[Validators.minLength(8),Validators.required]);


loginSubmit(){

console.log(this.email);
console.log(this.password);
  this.auth.Login(this.email.value,this.password.value)
}
}
