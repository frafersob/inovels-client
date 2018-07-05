import { Novel } from './novel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class NovelService {

  constructor(private http: HttpClient) { }

  getNovels() {
     return this.http.get('http://localhost:8080/api/novels/')
                .map(response => <Novel[]>response);
  }

  getNovel(id) {
     return this.http.get('http://localhost:8080/api/novels/' + id)
                .map(response => <Novel>response);
  }

  getNovelsByProgress(progress: String[]) {
     return this.http.get('http://localhost:8080/api/novelsByIds/' + progress)
                .map(response => <Novel[]>response);
  }

  public createNovel(novel: Novel) {
        return this.http.post('http://localhost:8080/api/novels/', novel);
  }

  public updateNovel(novel: Novel) {
        return this.http.put('http://localhost:8080/api/novels/' + novel.id, novel);
  }

  public deleteNovel(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/novels/' + id);
  }
}
