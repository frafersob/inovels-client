import { TokenStorage } from '../core/token.storage';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent {
  currentUser: User;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver,
    private token: TokenStorage,
    private userService: UserService,
    private translate: TranslateService) {}

  ngOnInit(){
    if (!this.token.getTokenExpired()) {
      this.userService.getUserByName(this.token.getDecodedToken().sub)
        .subscribe((user: User) => {
          this.currentUser = user;
      });
    }
  }

  useLanguage(language: string) {
    this.token.saveLanguage(language);
    this.translate.use(language);
  }
}
