import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  static matchingConfirmPasswords(passwordKey: any) {
    let passwordInput = passwordKey['value'];
    if (passwordInput.Password === passwordInput.ConfirmPassword) {
        return null;
    } else {
        return passwordKey.controls['ConfirmPassword'].setErrors({ passwordNotEquivalent: true });
    }
}

  constructor(private router: Router, private userService: UserService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthdate: new FormControl('', Validators.required),
    }, this.passwordConfirm );
  }

  passwordConfirm(c: AbstractControl): { nomatch: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {nomatch: true};
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let user = {
        id: null,
        username: this.signupForm.controls['username'].value,
        birthdate: this.signupForm.controls['birthdate'].value,
        avatar: null,
        novels: null,
        progress: null,
        createDateTime: null,
        role: 'ROLE_USER',
        email: this.signupForm.controls['email'].value,
        password: this.signupForm.controls['password'].value};
      this.userService.createUser(user).subscribe(
        data => {
          this.router.navigate(['login']);
          let snackBarRef = this.snackBar.open('User created', 'Dismiss', {
            duration: 500});
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log(err.error);
          } else {
            console.log(err.error);
          }
        }
      );

      }
   }


  get username(): any { return this.signupForm.get('username'); }
  get password(): any { return this.signupForm.get('password'); }
  get confirmPassword(): any { return this.signupForm.get('confirmPassword'); }
  get email(): any { return this.signupForm.get('email'); }
  get birthdate(): any { return this.signupForm.get('birthdate'); }

}
