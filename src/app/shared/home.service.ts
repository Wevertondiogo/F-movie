import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';

import { Movie } from './movie.model';
import { catchError, retry, map } from 'rxjs/operators';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private db: AngularFireDatabase) {}

  private Name = new BehaviorSubject<string>('');
  obsName = this.Name.asObservable();
  private Email = new BehaviorSubject<string>('');
  obsEmail = this.Email.asObservable();

  public getMovie(): Observable<Movie> {
    return this.http
      .get<Movie>(environment.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  public handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  setNameAndEmail(name: string, email: string) {
    const userName = this.Name.next(name);
    const userEmail = this.Name.next(email);

    return [userName, userEmail];
  }

  // public getData() {
  //   let key;
  //   this.db
  //     .list('users')
  //     .snapshotChanges(['child_added'])
  //     .subscribe((actions) => {
  //       actions.find((action) => {
  //         action.key === '-MNG6_tiC2ndeUFcvjSV' ? console.log(action) : '';
  //       });
  //     });
  // }
}
