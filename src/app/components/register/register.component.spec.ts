import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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

  it('form validity should be equal as asignated on the list for all the list', () => {
    let emailInput = component.registerForm.controls['email'];
    let passwordInput = component.registerForm.controls['password'];
    let first_nameInput = component.registerForm.controls['first_name'];
    let last_nameInput = component.registerForm.controls['last_name'];
    let result = dataTestregisterForm.reduce(
      (acc, [first_name, last_name, email, password, expected]) => {
        emailInput.setValue(email);
        passwordInput.setValue(password);
        first_nameInput.setValue(first_name);
        last_nameInput.setValue(last_name);
        return component.registerForm.valid !== expected ? false : acc;
      },
      true
    );
    expect(result).toBeTruthy();
  });

  it('button should be disabled', () => {
    let button = document.querySelector('.buttons__login');
    expect(button.hasAttribute('disabled')).toBeTruthy();
  });

  it('button should not be disabled', () => {
    component.registerForm.controls['email'].setValue('ab@cd');
    component.registerForm.controls['password'].setValue('123456');
    component.registerForm.controls['first_name'].setValue('abc');
    component.registerForm.controls['last_name'].setValue('abc');

    setTimeout(() => {
      let buttonState = document
        .querySelector('.buttons__login')
        .hasAttribute('disabled');
      expect(buttonState).toBeFalsy();
    }, 10);
  });
});
