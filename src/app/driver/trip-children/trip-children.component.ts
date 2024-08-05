import { Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-trip-children',
  templateUrl: './trip-children.component.html',
  styleUrls: ['./trip-children.component.css']
})
export class TripChildrenComponent implements OnInit{
  constructor(public child :ChildService){}
  searchText: string = '';  
  bus:any;
  ngOnInit(): void {
      this.child.GetChildrenByDriverId(this.child.GetMyId());
    }
}
