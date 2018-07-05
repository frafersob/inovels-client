import { TokenStorage } from '../../core/token.storage';
import { NavigatorComponent } from '../../navigator/navigator.component';
import { Novel } from '../../novel/novel';
import { NovelService } from '../../novel/novel.service';
import { User } from '../user';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {UserService} from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {isNumber} from 'util';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  signupForm: FormGroup;
  user: User;
  sameAccount: boolean;
  currentProgress: Map<number, number>;
  currentNovels: String[];
  novels: Novel[];

  static matchingConfirmPasswords(passwordKey: any) {
    let passwordInput = passwordKey['value'];
    if (passwordInput.Password === passwordInput.ConfirmPassword) {
        return null;
    } else {
        return passwordKey.controls['ConfirmPassword'].setErrors({ passwordNotEquivalent: true });
    }
}


  constructor(private route: ActivatedRoute,
    private router: Router, private token: TokenStorage,
    private userService: UserService, public snackBar: MatSnackBar,
    private novelService: NovelService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.token.getTokenExpired() && this.token.getToken()) {
      this.route.queryParams.subscribe(params => {
      this.createForm();
        if (params['id']) {
            this.userService.getUser(Number(params['id']))
                .subscribe((user: User) => {
                  this.signupForm.controls['id'].setValue(user.id);
                  this.signupForm.controls['avatar'].setValue(user.avatar);
                  this.user = user;
                  this.sameAccount = false;
                  this.userService.getProgresses(this.user.id)
                  .subscribe((progress: any) => {
                    this.currentProgress = progress;
                    this.currentNovels = Object.keys(progress);
                    this.novelService.getNovelsByProgress(this.currentNovels)
                      .subscribe((novels) => {
                          this.novels = novels;
                        });
                  });
            });
        } else {
            this.userService.getUserByName(this.token.getDecodedToken().sub)
                .subscribe((user: User) => {
                  this.signupForm.controls['id'].setValue(user.id);
                  this.signupForm.controls['avatar'].setValue(user.avatar);
                  this.user = user;
                  this.sameAccount = true;
                  this.userService.getProgresses(this.user.id)
                  .subscribe((progress: any) => {
                    this.currentProgress = progress;
                    this.currentNovels = Object.keys(progress);
                    this.novelService.getNovelsByProgress(this.currentNovels)
                      .subscribe((novels) => {
                          this.novels = novels;
                        });
                  });
            });
          }
      });
    } else {
      this.router.navigate(['']);
    }
  }

  onFileChange(event) {
    console.log("onfilechange");
    let reader = new FileReader();
     if(event.target.files && event.target.files.length) {
      const image = event.target.files[0];
      var imagerender = new Image();
      reader.readAsDataURL(image);

      reader.onload = () => {
        imagerender.src = reader.result;
        imagerender.onload = () => {
          this.signupForm.patchValue({
            avatar: {
              user: this.user,
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


  private createForm() {
    this.signupForm = new FormGroup({
    id: new FormControl(''),
    createDateTime: new FormControl(''),
    username: new FormControl(''),
    birthdate: new FormControl(''),
    progress: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    novels: new FormControl(''),
    avatar: new FormControl('')
    });
  }

  passwordConfirm(c: AbstractControl): { nomatch: boolean } {
    if (c.get('password').value !== c.get('confirmPassword').value) {
        return {nomatch: true};
    }
  }

  onSubmit() {
    if (this.signupForm.valid) {
      let user = {
        id: this.signupForm.controls['id'].value,
        username: null,
        birthdate: null,
        avatar: this.signupForm.controls['avatar'].value,
        novels: null,
        progress: null,
        createDateTime: null,
        role: null,
        email: null,
        password: null};
      this.userService.updateUser(user).subscribe(
        data => {
          window.location.reload();
          let snackBarRef = this.snackBar.open('User edited', 'Dismiss', {
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

  readNovel(id: number, p: number) {
    this.router.navigate(['novel'], { queryParams: { id: id, p: p } });
  }


  get username(): any { return this.signupForm.get('username'); }
  get password(): any { return this.signupForm.get('password'); }
  get confirmPassword(): any { return this.signupForm.get('confirmPassword'); }
  get email(): any { return this.signupForm.get('email'); }
  get birthdate(): any { return this.signupForm.get('birthdate'); }

}
