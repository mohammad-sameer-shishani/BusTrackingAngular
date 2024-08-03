import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FilterPipe } from '../pipes/filter.pipe';
import { MatProgressBarModule } from '@angular/material/progress-bar';







@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatRadioModule

  ],
  exports: [
   
    NavbarComponent,
    FooterComponent,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatOptionModule,
    MatExpansionModule,
    FilterPipe,
    MatProgressBarModule
  ]
})
export class SharedModule { }
