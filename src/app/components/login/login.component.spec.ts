import { AuthenticationService } from '../../services/authentication/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentFixture,
  inject,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';

// List of test data for the Login Form with its expected validity result
const dataTestLoginForm = [
  // [ email, password, expected ]
  ['', '', false],
  ['aa', 'aaaaa', false],
  ['a@a', 'aa45aa', true],
  ['aa', 'aaaaaa', false],
  ['aaeert', '123456aa', false],
  ['a@a', '12345', false],
  ['ar@ar.co', '123def', true],
  ['', '', false],
];

const EMAIL = 'email';
const PASSWORD = 'password';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        imports: [
          HttpClientModule,
          FormsModule,
          RouterTestingModule.withRoutes([]),
          ReactiveFormsModule,
        ],
        providers: [{ provide: AuthenticationService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form validity expected to equal to the value especified on entries list for all the list', () => {
    const emailInput = component.loginForm.controls[EMAIL];
    const passwordInput = component.loginForm.controls[PASSWORD];

    const result = dataTestLoginForm.reduce(
      (acc, [email, password, expected]) => {
        emailInput.setValue(email);
        passwordInput.setValue(password);
        return component.loginForm.valid !== expected ? false : acc;
      },
      true
    );
    expect(result).toBeTruthy();
  });

  it('button should be disabled', () => {
    const button = document.querySelector('.buttons__login');
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('button should not be disabled', () => {
    component.loginForm.controls[EMAIL].setValue('ab@cd');
    component.loginForm.controls[PASSWORD].setValue('123456');

    setTimeout(() => {
      const buttonState = document
        .querySelector('.buttons__login')
        .hasAttribute('disabled');
      expect(buttonState).toBeFalsy();
    }, 10);
  });

  it('should call the login method from the AuthenticationService', inject(
    [AuthenticationService],
    (mockUserService: AuthenticationService) => {
      spyOn(mockUserService, 'login');
      component.loginForm.controls[EMAIL].setValue('ab@cd');
      component.loginForm.controls[PASSWORD].setValue('123456');
      component.loginUser();
      expect(mockUserService.login).toHaveBeenCalled();
    }
  ));
});
