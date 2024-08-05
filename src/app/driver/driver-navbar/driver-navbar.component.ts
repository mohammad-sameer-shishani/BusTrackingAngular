import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {
  constructor(private auth:AuthService){}
  logout(){
    this.auth.logout()
  }
}
