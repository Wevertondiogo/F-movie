import { ViewInfoComponent } from './../home/content/view-info/view-info.component';
import { CardMovieComponent } from './../home/content/card-movie/card-movie.component';

import { HomeComponent } from './../home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './../form/login/login.component';
import { SignUpComponent } from './../form/sign-up/sign-up.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
    {path: '', component: CardMovieComponent},
    {path: 'view-info/:id', component: ViewInfoComponent}
  ]},
  // { path: '**', redirectTo: '/sign-up', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomRoutes {}
