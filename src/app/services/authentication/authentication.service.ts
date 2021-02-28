import { User } from './../../models/user';
import { Observable } from 'rxjs';
import { LoginUser } from './../../models/login-user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private basePath = 'https://reqres.in/api/';

  login(loginUser: LoginUser): Observable<any> {
    return this.http.post(this.basePath + 'login', loginUser);
  }

  signup(newUser: User): Observable<any> {
    return this.http.post(this.basePath + 'register', newUser);
  }
}
