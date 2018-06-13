import { Novel } from './novel';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
