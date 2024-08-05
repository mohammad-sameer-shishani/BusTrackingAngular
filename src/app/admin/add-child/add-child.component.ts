import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusService } from 'src/app/Services/bus.service';
import { ChildService } from 'src/app/Services/child.service';
import { HomeService } from 'src/app/Services/home.service';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent {
  constructor(public child:ChildService,public home:HomeService,public bus:BusService,public parent:UsersService ){}
  addChildForm:FormGroup = new FormGroup(
    {
      firstName :new FormControl('', Validators.required ),
      lastName :new FormControl('', Validators.required ),
      address : new FormControl('',Validators.required),
      busid :new FormControl('',Validators.required),
      parentid : new FormControl('',Validators.required),
    }
  )
  
  AddChild()
    {
      this.child.addChild(this.addChildForm.value);
    }
  
}
