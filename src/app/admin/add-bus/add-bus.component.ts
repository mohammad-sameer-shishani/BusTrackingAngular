import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BusService } from 'src/app/Services/bus.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent {
  constructor(public bus:BusService,public home:HomeService){}
  CreateBus:FormGroup = new FormGroup({
    busnumber: new FormControl('',Validators.required),
    childrennumber: new FormControl('',Validators.required),
    teacherid: new FormControl('',Validators.required),
    driverid: new FormControl('',Validators.required)
  });
  
  Create(){ 
    this.bus.CreatBus(this.CreateBus.value);
  }
  
}
