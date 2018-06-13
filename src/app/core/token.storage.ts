import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorage {
  user: User;

  constructor(private http: HttpClient, private userService: UserService) { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,  token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getDecodedToken(): any {
    try {
        return jwtDecode(localStorage.getItem(TOKEN_KEY));
    } catch (Error) {
        return null;
    }
  }

  public getUser() {
    return this.http.get('http://localhost:8080/api/userByName/' + this.getDecodedToken().sub)
      .map(response => <User>response);
  }

}
