import { Component } from '@angular/core';
import { ContentService } from '../Services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
constructor(public home :ContentService){}
}
