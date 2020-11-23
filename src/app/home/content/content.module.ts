import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';


import { ContentComponent } from './content.component';
import { CardMovieComponent } from './../content/card-movie/card-movie.component';
import { ViewInfoComponent } from './view-info/view-info.component';


@NgModule({
  declarations: [ContentComponent, CardMovieComponent, ViewInfoComponent],
  imports: [
    CommonModule,

    MatCardModule,
    RouterModule

  ],
  exports: [ContentComponent, RouterModule]
})
export class ContentModule { }
