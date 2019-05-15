import { NgModule } from '@angular/core';
import { KeysPipe } from './keys.pipe';
import { ThousandsSeparatorPipe } from './thousands-separator.pipe';
import { FileExtensionPipe, IsImageFilePipe } from './file-extension.pipe';
import { RoutingPathPipe } from './routing-path.pipe';
import { TrimPipe } from './trim.pipe';

@NgModule({
    imports: [
    ],
    declarations: [ KeysPipe, ThousandsSeparatorPipe, FileExtensionPipe, IsImageFilePipe, RoutingPathPipe, TrimPipe ],
    exports: [ KeysPipe, ThousandsSeparatorPipe, FileExtensionPipe, IsImageFilePipe, RoutingPathPipe, TrimPipe ]
})
export class NotaddPipesModule {
}
