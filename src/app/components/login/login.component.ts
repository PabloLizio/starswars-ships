import { Observable } from 'rxjs';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  dataLoading$: Observable<boolean>;
  loginError$: Observable<boolean>;

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {}

  ngOnInit(): void {
    this.dataLoading$ = this.auth.dataLoading.asObservable();
    this.loginError$ = this.auth.loginError.asObservable();

    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value);
    }
  }
}
