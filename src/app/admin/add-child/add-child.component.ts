import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent {
  constructor(public child:ChildService){}
  addChildForm:FormGroup = new FormGroup(
    {
      firstName :new FormControl('', Validators.required ),
      lastName :new FormControl('', Validators.required ),
      address : new FormControl('',Validators.required),
      busid :new FormControl('',Validators.required),
      parentid : new FormControl('',Validators.required),
    }
  )
  
  addChild()
    {
      this.child.addChild(this.addChildForm.value);
    }
  
}
