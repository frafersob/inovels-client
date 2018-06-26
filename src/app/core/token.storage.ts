import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';
const LANG_KEY = 'NovelLanguage';

@Injectable()
export class TokenStorage {

  constructor(private http: HttpClient, private userService: UserService) { }

  signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
  }

  public saveToken(token: string) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY,  token);
  }

  public saveLanguage(token: string) {
    localStorage.removeItem(LANG_KEY);
    localStorage.setItem(LANG_KEY,  token);
  }

  public getLanguage(): string {
    if (localStorage.getItem(LANG_KEY) != null) {
      return localStorage.getItem(LANG_KEY);
    } else {
      return 'en';
    }
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public getTokenExpired(): boolean {
    if (this.getDecodedToken()) {
      return ( this.getDecodedToken().exp * 1000 ) <= Date.now();
    } else {
      return false;
    }
  }

  public getDecodedToken(): any {
    try {
        return jwtDecode(localStorage.getItem(TOKEN_KEY));
    } catch (Error) {
        return null;
    }
  }

}
