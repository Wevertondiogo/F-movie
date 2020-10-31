import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private isLoading = new BehaviorSubject<boolean>(false);
  private emailError = new BehaviorSubject<string>('');
  private errorMessage = new BehaviorSubject<string>('');
  obsLoading = this.isLoading.asObservable();
  obsEmailError = this.emailError.asObservable();
  obsErrorMessage = this.errorMessage.asObservable();

  listRef = this.db.list('users');

  constructor(private db: AngularFireDatabase, private auth: AngularFireAuth) {}

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
        this.loading(false)
        console.log('Cadastro efetuado com sucesso!')
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
        this.loading(false)
        console.log('Login efetuado com sucesso!')
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
}
