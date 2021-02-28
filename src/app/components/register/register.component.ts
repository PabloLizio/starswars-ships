import { AuthenticationService } from './../../services/authentication/authentication.service';
import { StorageService } from './../../services/storage/storage.service';
import { SessionToken } from './../../models/session-token';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  dataLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storage: StorageService,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]],
      last_name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
    });
  }

  registerUser(): void {
    this.dataLoading = true;

    if (this.registerForm.valid) {
      this.auth.signup(this.registerForm.value).subscribe(
        (data) => this.registerSuccess(data),
        (error) => this.registerFailed(error)
      );
    }
  }

  private registerSuccess(data: SessionToken) {
    console.log('succes');
    this.dataLoading = false;
    this.storage.setCurrentSession(data);
    this.router.navigate(['/principal/ships']);
  }

  private registerFailed(error) {
    this.dataLoading = false;
    // this.loginError = true;
    console.log(error);
  }
}
