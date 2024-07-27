import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-create-child',
  templateUrl: './create-child.component.html',
  styleUrls: ['./create-child.component.css']
})
export class CreateChildComponent {
constructor(public child:ChildService ){}





addChildForm:FormGroup = new FormGroup(
  {
    firstName :new FormControl('First Name', Validators.required ),
    lastName :new FormControl('Last Name', Validators.required ),
    address : new FormControl('address',Validators.required),
    bus :new FormControl('',Validators.required),
    parent : new FormControl('',Validators.required),
  }
)

  addchild()
  {
    this.child.addChild(this.addChildForm.value);
  }
}
