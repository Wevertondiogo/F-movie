import { HomeService } from './home.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private isLoading = new BehaviorSubject<boolean>(false);
  obsLoading = this.isLoading.asObservable();
  private emailError = new BehaviorSubject<string>('');
  obsEmailError = this.emailError.asObservable();
  private errorMessage = new BehaviorSubject<string>('');
  obsErrorMessage = this.errorMessage.asObservable();
  private emailLogin = new BehaviorSubject<string>('');
  obsEmailLogin = this.emailLogin.asObservable();

  listRef = this.db.list('users');

  constructor(
    private db: AngularFireDatabase,
    private auth: AngularFireAuth,
    private router: Router,
    private homeService: HomeService
  ) {}

  delete() {
    this.listRef.remove().then(() => console.log('ok'));
  }

  insert(user: User) {
    this.listRef.push(user);
  }

  createEmailAndPassword(email: string, password: string) {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.loading(false);
        // this.homeService.setNameAndEmail(name, email);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.loading(false);
        this.handleEmailRepeat(error.message);
      });
  }

  verifyEmailAndPassword(email: string, password: string) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.loading(false);

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.handleErrorMessage(error.message);
        this.loading(false);
      });
  }

  handleEmailRepeat(emailError: string) {
    return this.emailError.next(emailError);
  }
  handleErrorMessage(errorMessage: string) {
    return this.errorMessage.next(errorMessage);
  }
  getAll() {
    return this.listRef.valueChanges();
  }
  loading(load: boolean) {
    return this.isLoading.next(load);
  }

  getEmailLogin(email: string) {
    return this.emailLogin.next(email);
  }
}
