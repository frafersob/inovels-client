import { LoginComponent } from '../login/login.component';
import { NavigatorComponent } from '../navigator/navigator.component';
import { CreatenovelComponent } from '../novel/createnovel/createnovel.component';
import { EditnovelComponent } from '../novel/editnovel/editnovel.component';
import { NovelComponent } from '../novel/novel.component';
import { NovelService } from '../novel/novel.service';
import { EditsceneComponent } from '../scene/editscene/editscene.component';
import { SceneComponent } from '../scene/scene.component';
import { SceneService } from '../scene/scene.service';
import { EdituserComponent } from '../user/edituser/edituser.component';
import { SignupComponent } from '../user/signup/signup.component';
import { UserComponent } from '../user/user.component';
import { UserService } from '../user/user.service';
import { Interceptor } from './app.interceptor';
import { AuthService } from './auth.service';
import { TokenStorage } from './token.storage';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'novels', component: NovelComponent },
  { path: 'newnovel', component: CreatenovelComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'editnovel', component: EditnovelComponent, runGuardsAndResolvers: 'always' },
  { path: 'editscene', component: EditsceneComponent, runGuardsAndResolvers: 'always' },
  { path: 'viewuser', component: EdituserComponent, runGuardsAndResolvers: 'always' },
  { path: 'edituser', component: EdituserComponent, runGuardsAndResolvers: 'always' },
  { path: 'novel', component: SceneComponent },
  { path: 'login', component: LoginComponent },
  {path : '', component : NovelComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
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
