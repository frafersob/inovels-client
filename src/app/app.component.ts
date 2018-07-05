import { TokenStorage } from './core/token.storage';
import { Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TimeagoIntl } from 'ngx-timeago';
import {strings as englishStrings} from 'ngx-timeago/language-strings/en';
import {strings as spanishStrings} from 'ngx-timeago/language-strings/es';
import {strings as germanStrings} from 'ngx-timeago/language-strings/de';
import {strings as frenchStrings} from 'ngx-timeago/language-strings/fr';
import {strings as russianStrings} from 'ngx-timeago/language-strings/ru';

@Component({
  selector: 'app-inovels',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  language: string;
  constructor(public el: ElementRef, private translate: TranslateService,
      private token: TokenStorage, intl: TimeagoIntl) {
        translate.setDefaultLang('en');
        this.language = 'en_US';
        if (token) {
        translate.setDefaultLang(token.getLanguage());
        switch (token.getLanguage()) {
           case 'en': {
              intl.strings = englishStrings;
              intl.changes.next();
              this.language = 'en_US';
              break;
           }
           case 'es': {
              intl.strings = spanishStrings;
              intl.changes.next();
              this.language = 'es_ES';
              break;
           }
           case 'fr': {
              intl.strings = frenchStrings;
              intl.changes.next();
              this.language = 'fr_FR';
              break;
           }
           case 'de': {
              intl.strings = germanStrings;
              intl.changes.next();
              this.language = 'de_DE';
              break;
           }
           case 'gr': {
              intl.strings = englishStrings;
              intl.changes.next();
              this.language = 'gr_GR';
              break;
           }
           case 'ru': {
              intl.strings = russianStrings;
              intl.changes.next();
              this.language = 'ru_RU';
              break;
           }
           default: {
              intl.strings = englishStrings;
              this.language = 'en_US';
              intl.changes.next();
              break;
           }
        }
      }
    const lang = document.createAttribute('lang');
    lang.value = this.language;
    this.el.nativeElement.parentElement.parentElement.attributes.setNamedItem(lang);
    }
}
