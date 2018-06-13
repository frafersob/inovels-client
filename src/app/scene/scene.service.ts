import { Scene } from './scene';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SceneService {

  constructor(private http: HttpClient) { }

  getScenes(id) {
     return this.http.get('http://localhost:8080/api/scenes/' + id)
                .map(response => <Scene[]>response);
  }
}
