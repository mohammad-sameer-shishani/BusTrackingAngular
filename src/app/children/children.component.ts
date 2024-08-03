import { Component, OnInit } from '@angular/core';
import { ChildService } from '../Services/child.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit{
constructor(public child :ChildService){}
userid:any;
  ngOnInit(): void {
    this.userid=this.GetUserIdFromLocal()
    this.child.GetMyChildren(this.userid);
  }


  GetUserIdFromLocal(): number | null {
    // Retrieve the JSON string from localStorage
    const user = localStorage.getItem("user");

    // Check if user data exists
    if (user) {
        try {
            // Parse the JSON string to an object
            const userObj = JSON.parse(user);

            // Access and return the UserId
            return userObj.UserId;
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            return null;
        }
    } else {
        console.log("No user found in localStorage");
        return null;
    }
}


}
