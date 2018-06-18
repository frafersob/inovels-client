import { TokenStorage } from '../core/token.storage';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
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
  currentUser: User;
  constructor(private router: Router, private novelService: NovelService,
  private token: TokenStorage, private userService: UserService) { }

  ngOnInit() {
      this.novelService.getNovels()
          .subscribe(novels => this.novels = novels);

      if (!this.token.getTokenExpired()) {
        this.userService.getUserByName(this.token.getDecodedToken().sub)
          .subscribe((user: User) => {
            this.currentUser = user;
        });
      }
  }

  readNovel(id: number) {
    this.router.navigate(['novel'], { queryParams: { id: id, p: 1 } });
  }

  editNovel(id: number) {
    this.router.navigate(['editnovel'], { queryParams: { id: id} });
  }
  
  viewUser(id: number) {
    this.router.navigate(['viewuser'], { queryParams: { id: id} });
  }
}
