import { Observable } from 'rxjs';
import { AuthenticationService } from './../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  dataLoading$: Observable<boolean>;
  registerError$: Observable<boolean>;

  constructor(private fb: FormBuilder, private auth: AuthenticationService) {
    this.dataLoading$ = this.auth.dataLoading.asObservable();
    this.registerError$ = this.auth.registerError.asObservable();
  }

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
    if (this.registerForm.valid) {
      this.auth.signup(this.registerForm.value);
    }
  }
}
