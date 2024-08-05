import { Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-view-children',
  templateUrl: './view-children.component.html',
  styleUrls: ['./view-children.component.css']
})
export class ViewChildrenComponent implements OnInit{
constructor(public child :ChildService){}
searchText: string = '';  
ngOnInit(): void {
    this.child.GetAllChildren();
  }

}
