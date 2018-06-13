import { LoginComponent } from '../login/login.component';
import { NavigatorComponent } from '../navigator/navigator.component';
import { NovelComponent } from '../novel/novel.component';
import { NovelService } from '../novel/novel.service';
import { SceneComponent } from '../scene/scene.component';
import { SceneService } from '../scene/scene.service';
import { SignupComponent } from '../signup/signup.component';
import { UserComponent } from '../user/user.component';
import { UserService } from '../user/user.service';
import { Interceptor } from './app.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'novels', component: NovelComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'novel', component: SceneComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [ NovelService, UserService, SceneService, AuthService, TokenStorage,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
  ]
  ,
  declarations: []
})
export class AppRoutingModule { }
