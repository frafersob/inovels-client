import { TokenStorage } from '../../core/token.storage';
import { User } from '../../user/user';
import { UserService } from '../../user/user.service';
import { NovelService } from '../novel.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnovel',
  templateUrl: './createnovel.component.html',
  styleUrls: ['./createnovel.component.css']
})
export class CreatenovelComponent implements OnInit {
  novelForm: FormGroup;
  currentUser: User;
  constructor(private router: Router, private token: TokenStorage,
    private userService: UserService, public snackBar: MatSnackBar,
    private novelService: NovelService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.token.getTokenExpired()) {
      this.userService.getUserByName(this.token.getDecodedToken().sub)
        .subscribe((user: User) => {
          this.currentUser = user;
          console.log(user);
      });
    }
    this.createForm();
  }

  private createForm() {
    this.novelForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      description: new FormControl('', [Validators.required, Validators.minLength(6)]),
      language: new FormControl('', [Validators.required]),
      agerange: new FormControl('', [Validators.required]),
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
        id: null,
        name: this.novelForm.controls['name'].value,
        description: this.novelForm.controls['description'].value,
        language: this.novelForm.controls['language'].value,
        agerange: this.novelForm.controls['agerange'].value,
        image: this.novelForm.get('image').value,
        scenes: null,
        createDateTime: null,
        updateDateTime: null,
        user: this.currentUser};
      this.novelService.createNovel(novel).subscribe(
        data => {
          this.router.navigate(['novels']);
          let snackBarRef = this.snackBar.open('Novel created', 'Dismiss', {
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
  get language(): any { return this.novelForm.get('language'); }
  get agerange(): any { return this.novelForm.get('agerange'); }

}
