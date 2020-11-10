import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [HomeComponent, HeaderComponent],
  imports: [
  HttpClientModule,

    CommonModule,
    MatToolbarModule
  ],
  exports: [ HomeComponent]
})
export class HomeModule { }
