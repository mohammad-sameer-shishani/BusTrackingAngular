import { Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/Services/child.service';

@Component({
  selector: 'app-absents',
  templateUrl: './absents.component.html',
  styleUrls: ['./absents.component.css']
})
export class AbsentsComponent implements OnInit{
  searchText:string='';
  constructor(public child :ChildService){}
  ngOnInit(): void {
    this.child.GetAllChildren()
    
  }

}
