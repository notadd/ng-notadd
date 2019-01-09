import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { ThousandsSeparatorPipe } from './thousands-separator.pipe';
import { FileExtensionPipe, IsImageFilePipe } from './file-extension.pipe';

@NgModule({
    imports: [
    ],
    declarations: [ KeysPipe, ThousandsSeparatorPipe, FileExtensionPipe, IsImageFilePipe ],
    exports: [ KeysPipe, ThousandsSeparatorPipe, FileExtensionPipe, IsImageFilePipe ]
})
export class NotaddPipesModule {
}
