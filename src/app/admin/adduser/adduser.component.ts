import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/Services/users.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
constructor(public user : UsersService){}





  
addUserForm:FormGroup = new FormGroup(
  {
    Firstname :new FormControl('first name', Validators.required ),
    Lastname :new FormControl('last name', Validators.required ),   
    Username : new FormControl('username',[Validators.required,Validators.minLength(5)]),  
    Roleid : new FormControl(Validators.required), 
    Password : new FormControl('********',[Validators.required,Validators.minLength(8),Validators.maxLength(40)]),
    Imagepath: new FormControl(),
    Phone : new FormControl('078',[Validators.minLength(10),Validators.maxLength(14)]),
    Address : new FormControl(),
    Gender : new FormControl(),
    Email : new FormControl('email@example.com',[Validators.email  ,Validators.required]),

  }
)


add(){
  debugger;
  this.user.addUser(this.addUserForm.value);
}





}
