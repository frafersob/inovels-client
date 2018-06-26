import { TokenStorage } from '../../core/token.storage';
import { Novel } from '../../novel/novel';
import { NovelService } from '../../novel/novel.service';
import { Scene } from '../../scene/scene';
import { SceneService } from '../../scene/scene.service';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editscene',
  templateUrl: './editscene.component.html',
  styleUrls: ['./editscene.component.css']
})
export class EditsceneComponent implements OnInit {
  novel: Novel;
  page: Scene;
  pageForm: FormGroup;
  currentUser: User;
  pageid: number;
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private token: TokenStorage,
    private userService: UserService, public snackBar: MatSnackBar,
    private novelService: NovelService, private sceneService: SceneService,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.token.getTokenExpired()) {
      this.userService.getUserByName(this.token.getDecodedToken().sub)
        .subscribe((user: User) => {
          this.currentUser = user;
          console.log(user);
      });
      this.route.queryParams.subscribe(params => {
      let novelid = Number(params['id']);
      let pageid = Number(params['p']);
      this.pageid = pageid;
      if (novelid != null && novelid > 0 && pageid != null && pageid > 0) {
        this.createForm();
        this.novelService.getNovel(novelid)
          .subscribe(novel => {this.novel = novel});
        this.sceneService.getScenes(novelid)
          .subscribe(scenes => {this.page = scenes[pageid - 1];
                                this.pageForm.setValue(scenes[pageid - 1])});
        console.log(this.novel);
      } else {
        this.router.navigate(['']);
      }
    });
    }
  }

  private createForm() {
    this.pageForm = new FormGroup({
      id: new FormControl(''),
      pageNumber: new FormControl(''),
      answer: new FormControl('', [Validators.maxLength(15)]),
      text: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(5000)]),
      image: new FormControl('', [Validators.required])
    });
  }

  onFileChange(event) {
    console.log("onfilechange");
    let reader = new FileReader();
     if(event.target.files && event.target.files.length) {
      const image = event.target.files[0];
      var imagerender = new Image();
      reader.readAsDataURL(image);
      console.log(image);

      reader.onload = () => {
        imagerender.src = reader.result;
        imagerender.onload = () => {
          this.pageForm.patchValue({
            image: {
              user: this.currentUser,
              name: image.name,
              src: reader.result.split(',')[1],
              extension: reader.result.split(',')[0].split(':')[1].split(';')[0],
              sizeX: imagerender.width,
              sizeY: imagerender.height,
              offsetX: 0,
              offsetY: 0
            }
          });


        };
        this.cd.markForCheck();
       }

    }
  }

  onSubmit() {
    if (this.pageForm.valid) {
      let page = {
        id: this.pageForm.controls['id'].value,
        pageNumber: this.pageForm.controls['pageNumber'].value,
        novel: this.novel,
        text: this.pageForm.controls['text'].value,
        image: this.pageForm.get('image').value,
        answer: this.pageForm.controls['answer'].value
        };
      this.sceneService.updateScene(page).subscribe(
        data => {
          this.ngOnInit();
          let snackBarRef = this.snackBar.open('Page edited', 'Dismiss', {
            duration: 500});
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

  trackByFn(index, item) {
    return index;
  }

  readPage() {
    this.router.navigate(['novel'], { queryParams: { id: this.novel.id, p: this.pageid } });
  }

  editPage(id: number) {
    this.router.navigate(['editscene'], { queryParams: { id: this.novel.id, p: id } });
  }

  editNovel() {
    this.router.navigate(['editnovel'], { queryParams: { id: this.novel.id} });
  }

  get text(): any { return this.pageForm.get('text'); }
  get answer(): any { return this.pageForm.get('answer'); }

}
