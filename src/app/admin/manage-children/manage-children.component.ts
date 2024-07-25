import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-manage-children',
  templateUrl: './manage-children.component.html',
  styleUrls: ['./manage-children.component.css']
})
export class ManageChildrenComponent implements OnInit{
  constructor(public home:HomeService){}
  ngOnInit(): void {
    this.home.GetAllChildren();
  }

}
