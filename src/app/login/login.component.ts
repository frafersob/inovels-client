import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {AuthService} from '../core/auth.service';
import { ErrorDialogComponent } from '../core/error-dialog.component';
import {TokenStorage} from '../core/token.storage';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string;
  password: string;

  constructor(private router: Router, public dialog: MatDialog, private authService: AuthService, private token: TokenStorage) {
  }

  login(): void {
    this.authService.attemptAuth(this.username, this.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        this.router.navigate(['novels']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.showError('Incorrect username or password.');
        } else {
          this.showError('Incorrect username or password.');
        }
      }
    );
  }

  showError(error: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: {errorMsg: error} , width : '250px'
    });
}
}
