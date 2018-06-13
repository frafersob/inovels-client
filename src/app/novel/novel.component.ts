import { Novel } from './novel';
import { Component, OnInit } from '@angular/core';
import { NovelService } from './novel.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-novels',
  templateUrl: './novel.component.html',
  styleUrls: ['./novel.component.css']
})
export class NovelComponent implements OnInit {
  novels: Novel[];
  constructor(private router: Router, private novelService: NovelService) { }

  ngOnInit() {
      this.novelService.getNovels()
          .subscribe(novels => this.novels = novels);
  }

  readNovel(id: number) {
    this.router.navigate(['novel'], { queryParams: { id: id, p: 1 } });
  }
}
