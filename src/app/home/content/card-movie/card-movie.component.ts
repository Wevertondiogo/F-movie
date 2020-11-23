import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Movie } from '../../../shared/movie.model';
import { HomeService } from './../../../shared/home.service';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent implements OnInit {

 public movies: Movie[];

  constructor(private homeService: HomeService, private router: Router,) { }

  ngOnInit(): void {
    this.homeService.getMovie().subscribe(movies => {
      console.log(movies.results)
      this.movies = movies.results
    })
  }

  viewInfo(card): void
  {
    const title: string = card.__ngContext__[29];
    this.router.navigate([`home/view-info/${title}`])
  }

}
