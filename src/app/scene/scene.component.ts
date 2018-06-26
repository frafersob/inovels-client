import { TokenStorage } from '../core/token.storage';
import { Novel } from '../novel/novel';
import { Scene } from './scene';
import { SceneService } from './scene.service';
import { NovelService } from '../novel/novel.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
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
  currentProgress: Map<number, number>;
  @ViewChild('answerBox') answerBox: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
    private token: TokenStorage, private sceneService: SceneService, private novelService: NovelService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!this.token.getTokenExpired()) {
        this.userService.getUserByName(this.token.getDecodedToken().sub)
          .subscribe((user: User) => {
            this.currentUser = user;
            this.userService.getProgresses(this.currentUser.id)
              .subscribe((progress: any) => {
                this.currentProgress = progress;
                this.novelid = Number(params['id']);
                this.page = Number(params['p']);
                if (this.novelid != null && this.page != null
                  && this.novelid > 0 && this.page > 0
                  && this.currentUser) {
                  this.novelService.getNovel(this.novelid)
                    .subscribe(novel => {this.novel = novel; this.user = novel.user});
                  this.sceneService.getScenes(this.novelid)
                    .subscribe(scenes => {this.scene = scenes[this.page - 1]; this.pages = scenes.length});
                  if (!this.currentProgress || !this.currentProgress[this.novelid]) {
                    if (!this.currentProgress[this.novelid]) {
                    this.userService.updateProgress(this.currentUser.id, this.novelid).subscribe(
                      data => {},
                      (err: HttpErrorResponse) => {
                        if (err.error instanceof Error) {
                          console.log(err.error);
                        } else {
                          console.log(err.error);
                        }
                      }
                    );
                    }
                  }
                } else {
                  this.router.navigate(['']);
                }
            });
        });
      } else {
        console.log('token expired');
      }
    });
  }

  nextPage() {
    if (this.page < this.pages && this.currentProgress[this.novelid]) {
      if (this.currentProgress[this.novelid] >= (this.page + 1)) {
        this.router.navigate(['novel'], { queryParams: { id: this.novelid, p: (this.page + 1) } });
      } else {
        if (this.answerBox.nativeElement.value === this.scene.answer) {
          this.currentProgress[this.novelid]++;
          this.userService.updateProgress(this.currentUser.id, this.novelid).subscribe(
            data => {
               this.router.navigate(['novel'], { queryParams: { id: this.novelid, p: (this.page + 1) } });
            },
            (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                console.log(err.error);
              } else {
                console.log(err.error);
              }
            }
          );
        }
      }
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.router.navigate(['novel'], { queryParams: { id: this.novelid, p: (this.page - 1) } });
    }
  }

  notFirstPage() {
    return this.page > 1;
  }

  notLastPage() {
    return this.page < this.pages;
  }

  editPage() {
    this.router.navigate(['editscene'], { queryParams: { id: this.novelid, p: this.page } });
  }
}

