import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import { environment } from './../../environments/environment';

import { Movie } from './movie.model';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  
  constructor(private http: HttpClient) { }

  public getMovie(): Observable<Movie>
  {
    return this.http.get<Movie>(environment.url)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  public getMovieById(): Observable<Movie> 
  {
    const url = 'https://api.themoviedb.org/3/find/163?api_key=7d4ee3a425a49d1e555e12c2869b5574&language=en-US&external_source=imdb_id'
    return this.http.get<Movie>(url)
    .pipe(
      retry(2),
      catchError(this.handleError)
      )
    
  }

   public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
