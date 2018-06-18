import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  public currentUser: any;

  private userUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}


  public getUsers(): Observable<any> {
    return this.http.get(this.userUrl + '/users');
  }

  public getUser(id: number): Observable<any> {
    return this.http.get(this.userUrl + '/users/' + id);
  }

  public getUserByName(name: string): Observable<any> {
    return this.http.get(this.userUrl + '/userByName/' + name);
  }

  public createUser(user: User) {
    console.log('creating user');
    console.log(user);
        return this.http.post(this.userUrl + '/users', user);
  }

  public updateUser(user: User) {
        return this.http.put(this.userUrl + '/users/' + user.id, user);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(this.userUrl + '/users/' + id);
  }

}
