import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

@Injectable()
export class AuthService {

  baseUrl: 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }

  attemptAuth(username: string, password: string): Observable<any> {
    const credentials = {username: username, password: password};
    console.log('attempting Auth ::');
    return this.http.post('http://localhost:8080/api/token/generate-token', credentials);
  }

 }
