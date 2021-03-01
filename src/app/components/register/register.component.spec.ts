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
import { RegisterComponent } from './register.component';

const dataTestregisterForm = [
  ['', '', '', '', false],
  ['abc', 'abc', 'a@b', 'abcdef', true],
  ['abc', 'abc', 'a@b', 'abcde', false],
  ['abc', 'abc', 'a@', 'abcdef', false],
  ['abc', 'ab', 'a@b', 'abcdef', false],
  ['ab', 'abc', 'a@b', 'abcdef', false],
  ['abc', 'abc', 'a@b.c', 'abcdef', true],
  ['abc', 'abc', 'a@b.c', '123456', true],
  ['abcqwe', 'abcqwe', 'a@b.c', '123456', true],
  ['', '', 'a@b', '123456', false],
  ['', 'qwerwq', 'a@b', '123456', false],
  ['werwer', '', 'a@b', '123456', false],
];

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form validity expected to equal to the value especified on entries list for all the list', () => {
    const emailInput = component.registerForm.controls['email'];
    const passwordInput = component.registerForm.controls['password'];
    const firstNameInput = component.registerForm.controls['first_name'];
    const lastNameInput = component.registerForm.controls['last_name'];
    const result = dataTestregisterForm.reduce(
      (acc, [firstName, lastName, email, password, expected]) => {
        emailInput.setValue(email);
        passwordInput.setValue(password);
        firstNameInput.setValue(firstName);
        lastNameInput.setValue(lastName);
        return component.registerForm.valid !== expected ? false : acc;
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
    component.registerForm.controls['email'].setValue('ab@cd');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['first_name'].setValue('abc');
    component.registerForm.controls['last_name'].setValue('abc');

    setTimeout(() => {
      const buttonState = document
        .querySelector('.buttons__login')
        .hasAttribute('disabled');
      expect(buttonState).toBeFalsy();
    }, 10);
  });

  it('should call the signup method from the AuthenticationService', inject(
    [AuthenticationService],
    (mockUserService: AuthenticationService) => {
      spyOn(mockUserService, 'signup');
      component.registerForm.controls['email'].setValue('ab@cd');
      component.registerForm.controls['password'].setValue('123456');
      component.registerForm.controls['first_name'].setValue('abc');
      component.registerForm.controls['last_name'].setValue('abc');
      component.registerUser();
      expect(mockUserService.signup).toHaveBeenCalled();
    }
  ));
});
