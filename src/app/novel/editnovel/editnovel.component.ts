import { TokenStorage } from '../../core/token.storage';
import { Scene } from '../../scene/scene';
import { SceneService } from '../../scene/scene.service';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { Novel } from '../novel';
import { NovelService } from '../novel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editnovel',
  templateUrl: './editnovel.component.html',
  styleUrls: ['./editnovel.component.css']
})
export class EditnovelComponent implements OnInit {
  novel: Novel;
  pages: Scene[];
  novelForm: FormGroup;
  currentUser: User;
  downloadJsonHref: any;

  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private token: TokenStorage,
    private userService: UserService, public snackBar: MatSnackBar,
    private novelService: NovelService, private sceneService: SceneService,
    private cd: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    if (!this.token.getTokenExpired()) {
      this.userService.getUserByName(this.token.getDecodedToken().sub)
        .subscribe((user: User) => {
          this.currentUser = user;
          console.log(user);
      });
      this.route.queryParams.subscribe(params => {
      let novelid = Number(params['id']);
      if (novelid != null && novelid > 0) {
        this.createForm();
        this.novelService.getNovel(novelid)
          .subscribe(novel => {
            this.novelForm.setValue(novel); 
            this.novel = novel; 
            this.generateJsonDownload(this.novel);});
        this.sceneService.getScenes(novelid)
          .subscribe(scenes => this.pages = scenes);
      } else {
        this.router.navigate(['']);
      }
    });
    }
  }

  private createForm() {
    this.novelForm = new FormGroup({
      id: new FormControl(''),
      user: new FormControl(''),
      scenes: new FormControl(''),
      createDateTime: new FormControl(''),
      updateDateTime: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6)]),
      image: new FormControl('', [Validators.required])
    });
  }

  onFileChange(event) {
    console.log('onfilechange');
    let reader = new FileReader();
     if (event.target.files && event.target.files.length) {
      const image = event.target.files[0];
      var imagerender = new Image();
      reader.readAsDataURL(image);
      console.log(image);

      reader.onload = () => {
        imagerender.src = reader.result;
        imagerender.onload = () => {
          this.novelForm.patchValue({
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
    if (this.novelForm.valid) {

      let novel = {
        id: this.novelForm.controls['id'].value,
        name: this.novelForm.controls['name'].value,
        description: this.novelForm.controls['description'].value,
        image: this.novelForm.get('image').value,
        scenes: this.novelForm.controls['scenes'].value,
        createDateTime: null,
        updateDateTime: null,
        user: this.currentUser};
      this.novelService.updateNovel(novel).subscribe(
        data => {
          this.ngOnInit();
          let snackBarRef = this.snackBar.open('Novel edited', 'Dismiss', {
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

  newPage() {
    let page = {
        id: null,
        pageNumber: this.pages.length + 1,
        novel: this.novel,
        text: 'Text of page ' + (this.pages.length + 1),
        image: null,
        answer: ''
        };
      this.sceneService.createScene(page).subscribe(
        data => {
          this.ngOnInit();
          let snackBarRef = this.snackBar.open('Page created', 'Dismiss', {
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
 
  generateJsonDownload(novel: Novel) {
    let theJSON = JSON.stringify(novel);
    let blob = new Blob([theJSON], { type: 'text/json' });
    let url= window.URL.createObjectURL(blob);
    let uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    this.downloadJsonHref = uri;
  }

  trackByFn(index, item) {
    return index;
  }

  readPage(id: number) {
    this.router.navigate(['novel'], { queryParams: { id: this.novel.id, p: id } });
  }

  editPage(id: number) {
    this.router.navigate(['editscene'], { queryParams: { id: this.novel.id, p: id} });
  }

  get name(): any { return this.novelForm.get('name'); }
  get description(): any { return this.novelForm.get('description'); }

}
