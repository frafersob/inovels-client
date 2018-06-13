import { Novel } from '../novel/novel';
import { Scene } from './scene';
import { SceneService } from './scene.service';
import { NovelService } from '../novel/novel.service';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {
  scene: Scene;
  page: number;
  novel: number;
  pages: number;
  constructor(private route: ActivatedRoute, private router: Router,
    private sceneService: SceneService, private novelService: NovelService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.novel = Number(params['id']);
      this.page = Number(params['p']);
      console.log('novel = ' + this.novel + ' page = ' + this.page);
      if (this.novel != null && this.page != null && this.novel > 0 && this.page > 0) {
        this.sceneService.getScenes(this.novel)
          .subscribe(scenes => this.scene = scenes[this.page - 1]);
        console.log(this.scene);
        this.sceneService.getScenes(this.novel)
          .subscribe(scenes => this.pages = scenes.length);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  nextPage() {
    console.log('next page ' + (this.page + 1)  + ' of ' + this.pages);
    if (this.page < this.pages) {
      this.router.navigate(['novel'], { queryParams: { id: this.novel, p: (this.page + 1) } });
    }
  }

  previousPage() {
    console.log('prev page');
    if (this.page > 1) {
      this.router.navigate(['novel'], { queryParams: { id: this.novel, p: (this.page - 1) } });
    }
  }
}

