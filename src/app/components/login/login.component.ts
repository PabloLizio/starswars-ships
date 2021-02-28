import { StorageService } from './../../services/storage/storage.service';
import { SessionToken } from './../../models/session-token';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLoading: boolean = false;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginUser(): void {
    this.dataLoading = true;

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe(
        (data) => this.loginSuccess(data),
        (error) => this.loginFailed(error)
      );
    }
  }

  private loginSuccess(data: SessionToken) {
    console.log('succes');
    this.dataLoading = false;
    this.storage.setCurrentSession(data);
    this.router.navigate(['/principal/ships']);
  }

  private loginFailed(error) {
    this.dataLoading = false;
    this.loginError = true;
    console.log(error);
  }
}
