import { SessionToken } from './../../models/session-token';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { User } from './../../models/user';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginUser } from './../../models/login-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  dataLoading = new BehaviorSubject<boolean>(false);
  loginError = new BehaviorSubject<boolean>(false);

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

  signup(newUser: User): Observable<any> {
    return this.http.post(this.basePath + 'register', newUser);
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
}
