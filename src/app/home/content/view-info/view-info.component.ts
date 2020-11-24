import { Observable } from 'rxjs';
import { Movie } from './../../../shared/movie.model';
import { HomeService } from './../../../shared/home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-info',
  templateUrl: './view-info.component.html',
  styleUrls: ['./view-info.component.scss']
})
export class ViewInfoComponent implements OnInit {

  public movie: Movie;

  constructor(private activeRoute: ActivatedRoute, private homeService: HomeService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(param => {
      
      this.getMovieById(param['id']);
    })
  }
  getMovieById(id: number)
  {
     this.homeService.getMovie().subscribe(movies => {
     return movies
     .results
     .find(movie => movie.id === Number(id)? this.movie = movie : null)
    })
  }
}
