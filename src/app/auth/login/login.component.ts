import { Component } from '@angular/core';
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
}
