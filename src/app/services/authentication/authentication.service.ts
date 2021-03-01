import { SessionToken } from './../../models/session-token';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { User } from './../../models/user';
import { BehaviorSubject } from 'rxjs';
import { LoginUser } from './../../models/login-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  dataLoading = new BehaviorSubject<boolean>(false);
  loginError = new BehaviorSubject<boolean>(false);
  registerError = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {}

  private basePath = 'https://reqres.in/api/';

  login(loginUser: LoginUser): void {
    this.dataLoading.next(true);
    this.http.post(this.basePath + 'login', loginUser).subscribe(
      (data: SessionToken) => this.loginSuccess(data),
      (error) => this.loginFailed(error)
    );
  }

  signup(newUser: User): void {
    this.http.post(this.basePath + 'register', newUser).subscribe(
      (data: SessionToken) => this.registerSuccess(data),
      (error) => this.registerFailed(error)
    );
  }

  private loginSuccess(data: SessionToken) {
    this.loginError.next(false);
    console.log('succes');
    this.dataLoading.next(false);
    this.storage.setCurrentSession(data);
    this.router.navigate(['/principal/ships']);
  }

  private loginFailed(error) {
    this.dataLoading.next(false);
    this.loginError.next(true);
    console.log(error);
  }

  private registerSuccess(data: SessionToken) {
    console.log('succes');
    this.dataLoading.next(false);
    this.registerError.next(false);
    this.storage.setCurrentSession(data);
    this.router.navigate(['/principal/ships']);
  }

  private registerFailed(error) {
    this.dataLoading.next(false);
    this.registerError.next(true);
    console.log(error);
  }
}
