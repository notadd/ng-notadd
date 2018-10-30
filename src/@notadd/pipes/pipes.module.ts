import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { ThousandsSeparatorPipe } from './thousands-separator.pipe';

@NgModule({
    imports: [
    ],
    declarations: [ KeysPipe, ThousandsSeparatorPipe ],
    exports: [ KeysPipe, ThousandsSeparatorPipe ]
})
export class NotaddPipesModule {
}
