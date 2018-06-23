import { Scene } from './scene';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class SceneService {

  constructor(private http: HttpClient) { }

  getScenes(id) {
     return this.http.get('http://localhost:8080/api/scenes/' + id)
                .map(response => <Scene[]>response);
  }

   public createScene(scene: Scene) {
    console.log('creating scene');
    console.log(scene);
        return this.http.post('http://localhost:8080/api/scenes/', scene);
  }

  public updateScene(scene: Scene) {
        return this.http.put('http://localhost:8080/api/scenes/' + scene.id, scene);
  }

  public deleteScene(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/scenes/' + id);
  }
}
