import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';

@Component({
  selector: 'app-view-parents',
  templateUrl: './view-parents.component.html',
  styleUrls: ['./view-parents.component.css']
})
export class ViewParentsComponent implements OnInit{
  constructor(public parent:UsersService){}
  ngOnInit(): void {
    this.parent.getAllParents()
  }

}
