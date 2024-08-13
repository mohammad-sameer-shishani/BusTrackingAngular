import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-driver-sidebar',
  templateUrl: './driver-sidebar.component.html',
  styleUrls: ['./driver-sidebar.component.css']
})
export class DriverSidebarComponent {
  constructor(private auth:AuthService){}
  logout(){
    this.auth.logout()
  }
}
