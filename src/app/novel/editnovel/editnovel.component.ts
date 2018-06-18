import { TokenStorage } from '../../core/token.storage';
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

@Component({
  selector: 'app-editnovel',
  templateUrl: './editnovel.component.html',
  styleUrls: ['./editnovel.component.css']
})
export class EditnovelComponent implements OnInit {
  novel: Novel;
  novelForm: FormGroup;
  currentUser: User;
  constructor(private route: ActivatedRoute, private location: Location,
    private router: Router, private token: TokenStorage,
    private userService: UserService, public snackBar: MatSnackBar,
    private novelService: NovelService, private cd: ChangeDetectorRef) { }

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
          .subscribe(novel => {this.novelForm.setValue(novel); this.novel = novel});
        console.log(this.novel);
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

  get name(): any { return this.novelForm.get('name'); }
  get description(): any { return this.novelForm.get('description'); }

}
