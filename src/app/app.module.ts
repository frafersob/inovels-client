import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
import {TimeAgoPipe} from 'time-ago-pipe';
import * as moment from 'moment';
import { AppComponent } from './app.component';
import { Interceptor } from './core/app.interceptor';
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { LoginComponent } from './login/login.component';
import { NovelComponent } from './novel/novel.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { LayoutModule } from '@angular/cdk/layout';
import {ErrorDialogComponent} from './core/error-dialog.component';
import { NovelService } from './novel/novel.service';
import { TokenStorage } from './core/token.storage';
import { UserComponent } from './user/user.component';
import { UserService } from './user/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { SceneComponent } from './scene/scene.component';
import { SceneService } from './scene/scene.service';
import { CreatenovelComponent } from './novel/createnovel/createnovel.component';
import { EditnovelComponent } from './novel/editnovel/editnovel.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './core/app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    NovelComponent,
    TimeAgoPipe,
    NavigatorComponent,
    LoginComponent,
    UserComponent,
    SceneComponent,
    CreatenovelComponent,
    EditnovelComponent,
    SignupComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  entryComponents: [ErrorDialogComponent],
  providers: [ErrorDialogComponent, NovelService, UserService, SceneService, AuthService, TokenStorage,
    {provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi : true}
],
  bootstrap: [AppComponent]
})
export class AppModule {
    constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
