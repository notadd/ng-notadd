import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NotaddLocale } from '@notadd/types';

@Injectable({
    providedIn: 'root'
})
export class NotaddTranslationService {

    constructor(
        private translateService: TranslateService
    ) {
    }

    /**
     * 设置给定语言的翻译对象
     * 如果要附加翻译而不是替换翻译，则应将 `shouldMerge` 设置为true
     * @param locales
     */
    setTranslation(locales: Array<NotaddLocale>) {
        locales.map(locale => {
            this.translateService.setTranslation(locale.lang, locale.translations, true);
        });
    }
}
