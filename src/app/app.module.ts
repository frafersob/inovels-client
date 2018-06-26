import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material.module';
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
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { SceneComponent } from './scene/scene.component';
import { SceneService } from './scene/scene.service';
import { CreatenovelComponent } from './novel/createnovel/createnovel.component';
import { EditnovelComponent } from './novel/editnovel/editnovel.component';
import { SignupComponent } from './user/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './core/app.routing.module';
import { FileInputAccessorModule } from 'file-input-accessor';
import { EdituserComponent } from './user/edituser/edituser.component';
import { EditsceneComponent } from './scene/editscene/editscene.component';
import { HttpClient } from '@angular/common/http';
import { TimeagoModule, TimeagoIntl } from 'ngx-timeago';
import { NgxTrumbowygModule } from 'ngx-trumbowyg';

export class MyIntl extends TimeagoIntl {
}

@NgModule({
  declarations: [
    AppComponent,
    NovelComponent,
    NavigatorComponent,
    LoginComponent,
    UserComponent,
    SceneComponent,
    CreatenovelComponent,
    EditnovelComponent,
    SignupComponent,
    ErrorDialogComponent,
    EdituserComponent,
    EditsceneComponent,
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
    AppRoutingModule,
    FileInputAccessorModule,
    TimeagoModule.forRoot({
      intl: { provide: TimeagoIntl, useClass: MyIntl }
    }),
    NgxTrumbowygModule.withConfig({
            lang: 'en',
            svgPath: './assets/icons.svg',
            removeformatPasted: true,
            autogrow: true,
            btns: [
                ['formatting'],
                ['strong', 'em', 'del'],
                ['superscript', 'subscript'],
                ['link'],
                ['insertImage'],
                ['unorderedList', 'orderedList'],
                ['horizontalRule'],
                ['removeformat'],
                ['fullscreen']
            ]
        }),
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
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

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

