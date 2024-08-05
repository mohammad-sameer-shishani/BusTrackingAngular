import { Component } from '@angular/core';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-trip-children',
  templateUrl: './trip-children.component.html',
  styleUrls: ['./trip-children.component.css']
})
export class TripChildrenComponent {
  constructor(public child :ChildService){}
  searchText: string = '';  
  bus:any;
  ngOnInit(): void {
      this.child.GetAllChildren();
      
    }
}
