import { TokenStorage } from '../core/token.storage';
import { Novel } from '../novel/novel';
import { Scene } from './scene';
import { SceneService } from './scene.service';
import { NovelService } from '../novel/novel.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
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
  novelid: number;
  pages: number;
  novel: Novel;
  user: User;
  currentUser: User;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
    private token: TokenStorage, private sceneService: SceneService, private novelService: NovelService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!this.token.getTokenExpired()) {
        this.userService.getUserByName(this.token.getDecodedToken().sub)
          .subscribe((user: User) => {
            this.currentUser = user;
            console.log(user);
        });
      }
      this.novelid = Number(params['id']);
      this.page = Number(params['p']);
      console.log('novel = ' + this.novelid + ' page = ' + this.page);
      if (this.novelid != null && this.page != null && this.novelid > 0 && this.page > 0) {
        this.novelService.getNovel(this.novelid)
          .subscribe(novel => {this.novel = novel; this.user = novel.user});
        this.sceneService.getScenes(this.novelid)
          .subscribe(scenes => {this.scene = scenes[this.page - 1]; this.pages = scenes.length});
        console.log(this.scene);
      } else {
        this.router.navigate(['']);
      }
    });
  }

  nextPage() {
    console.log('next page ' + (this.page + 1)  + ' of ' + this.pages);
    if (this.page < this.pages) {
      this.router.navigate(['novel'], { queryParams: { id: this.novelid, p: (this.page + 1) } });
    }
  }

  previousPage() {
    console.log('prev page');
    if (this.page > 1) {
      this.router.navigate(['novel'], { queryParams: { id: this.novelid, p: (this.page - 1) } });
    }
  }
}

